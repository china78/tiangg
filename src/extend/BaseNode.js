import Vue from 'vue';
import cLoader from 'src/extend/componentLoader';
import common from '../assets/js/common';
import {
  mapState
} from 'vuex';
function styleParser (style = {}) {
  styleParser.$div = styleParser.$div || document.createElement('div');
  const sortedStyle = Object.keys(style).sort((a = '', b = '') => a.length > b.length ? 1 : -1).reduce((o, k) => {
    o += `${k}: ${style[k]};`;
    return o;
  }, '');
  styleParser.$div.style = sortedStyle;
  return styleParser.$div.style.cssText
    .split(/;\s*/)
    .reduce((o, v = '') => {
      const arr = v.match(/^\s*([^:]+):\s*(.+)\s*$/);
      const info = arr ? { [arr[1]]: arr[2] } : {};
      return Object.assign(o, info);
    }, {});
}
export default {
  name: 'node',
  props: {
    info: {
      required: true,
      type: Object
    }
  },
  data: function () {
    return {
      currPage: ''
    };
  },
  watch: {},
  computed: {
    ...mapState({
      Config: state => state.Config,
      Metadata: state => state.Metadata,
      DataHub: state => state.DataHub,
    }),
    fixed: function () {
      return this.nodeInfo && this.nodeInfo.style.position == 'fixed';
    },
    isRootNode () {
      return this.nodeInfo.id === 'root' || this.nodeInfo.type === 'node' || this.$parent.$options.name === 'widgetScene';
    },
    computedStyle () {
      const sortedStyle = styleParser(this.nodeInfo.style);
      const slotStyle = typeof this.slotStyle === 'object' && this.slotStyle ? this.slotStyle : {};
      return Object.assign({ 'pointer-events': this.packedChild ? 'none' : 'auto' }, sortedStyle, slotStyle);
    },
    parentNodeVm () {
      let $vm = this;
      while (($vm = $vm.$parent, $vm && $vm.$options.name !== 'node'));
      return $vm;
    }
  },
  mounted: function () { },
  methods: {
    async runAnimate ({
      clearFirst
    } = {}) {
      if (clearFirst && this.oldStyle) {
        this.$el.style.cssText = this.styleChangeStr(this.oldStyle);
        await this.$nextTick();
      }
      this.oldStyle = Object.assign({}, this.computedStyle);
      this.nodeInfo.animate = this.nodeInfo.animate || [];
      let animateLength = this.nodeInfo.animate.length;
      if (animateLength === 0) {
        return false;
      }
      let initAnimateIndex = 0;
      let parentNode = this.$el;
      let me = this;
      animateEndEvent();

      function animateEndEvent () {
        const oldStyle = me.styleChangeStr(me.oldStyle);
        let animate = me.nodeInfo.animate[initAnimateIndex];
        if (initAnimateIndex < animateLength) {
          let countNum = animate.infinite ? 'infinite' : animate.countNum;
          let style = `
          -webkit-animation-name:${animate.type};
          -webkit-animation-duration:${animate.duration}s;
          -webkit-animation-iteration-count:${countNum};
          -webkit-animation-delay:${animate.delay}s;
          -webkit-animation-fill-mode:both;
          -webkit-animation-timing-function:${animate.timingFunction || 'ease'};
          `;
          style += oldStyle + (!me.visible ? 'display:none;' : '');
          parentNode.style.cssText = style;
          ++initAnimateIndex;
        }
        // else {
        //   parentNode.style.cssText = oldStyle
        // }
      }
      parentNode.addEventListener('animationend', animateEndEvent, false);
    },
    styleChangeStr (style) {
      let styleStr = '';
      for (var attr in style) {
        styleStr += `${attr.replace(/[A-Z]+/g, m => `-${m.toLowerCase()}`)}:${style[attr]};`;
      }
      return styleStr;
    },
    registerNode: function (node) {
      var plugins = this.mixinsScript(); // ????????????????????????
      var TempleteModule = Vue.extend(cLoader.getComponent(node));
      // ??????datahub truck-lib
      plugins.push({
        Truck: window.Truck, // ??????????????????
        $lib: window.Truck,
        methods: {
          dataHubSet: this.dataHubSet,
          dataHubGet: this.dataHubGet
        }
      });
      // ????????????
      var MixedModule = plugins.reduce((a, b) => a.extend(b), TempleteModule);
      Vue.component(this.nodeInfo.id, MixedModule);
    },
    /**
     * ==============????????????===============
     */
    mixinsScript: function () {
      window._script = window._script || {};
      if (this.nodeInfo.id) {
        var rawScript = [];
        // ????????????Script?????????????????????
        if (this.nodeInfo.script instanceof Array) {
          // ??????????????????????????????
          rawScript = this.nodeInfo.script.map(s => typeof s === 'string' ? { content: s } : s);
        } else {
          rawScript = [this.nodeInfo.script && typeof this.nodeInfo.script === 'string' ? { content: this.nodeInfo.script } : { content: 'return {}' }];
        }
        // ????????????
        var combinedScript = `window._script['${this.nodeInfo.id}'] = function(vm){
          return [${rawScript.filter(({ content } = {}) => typeof content === 'string' && content.trim().length > 0).map(({ content, runtimeOnly = false } = {}) => wrapper(content, runtimeOnly)).join(',')}].map(function(fn) {
            return fn(vm)
          })
        }`;
        var result = [];
        if (process.env.PAGE === 'EDITOR') {
          try {
            // ????????????
            var compiledScript = window.Babel.transform(combinedScript, {
              presets: ['es2015', 'es2017', 'stage-0'],
            }).code;
            // ????????????
            window.eval(compiledScript);
            result = window._script[this.nodeInfo.id](this);
          } catch (e) {
            this.ema.fire('bughd.open', e);
            console.error('??????????????????', e);
          }
        } else {
          window.eval(combinedScript);
          result = window._script[this.nodeInfo.id](this);
        }
        return result;
      } else {
        return [];
      }
      // ????????????
      function wrapper (script, runtimeOnly) {
        const runtimeOnlyTpl = `
        if (window.EDIT_TYPE == \'EDITOR\') {
          ;["beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "activated", "deactivated", "beforeDestroy", "destroyed"].map(v => {
            delete options[v]
          })
        }`;
        return `function(vm){
          var options = function (vm) {
          ${script}
          }(vm)
          ${runtimeOnly ? runtimeOnlyTpl : ''}
          return options
        }`;
      }
    },
    /**
     * @desc ???????????????????????????/????????????
     * @param {object|string} path ?????????????????? `a.b.c`
     * @param {undefined|*} val ???
     */
    dataHubSet (path, val) {
      if (val === undefined || val === null) {
        val = path.val;
        path = path.path;
      }
      this.$store.dispatch('dataHubSet', {
        path,
        val
      });
    },
    /**
     * @desc ???????????????????????????
     * @param {*} path ?????????????????? `a.b.c`
     */
    dataHubGet (path) {
      return common.objectGetByPath(this.DataHub, path);
    },
    /**
     * ???????????????????????????????????????????????????????????????????????????????????????????????????
     * @param {node} node
     */
    isVisible (node) {
      var parentNode = node;
      var flag = true;
      while (parentNode && parentNode.nodeInfo) {
        if (parentNode.nodeInfo.visible == false) {
          flag = false;
          break;
        }
        parentNode = parentNode.$parent;
      }
      return flag;
    },
    /**
     * slots
      - false
      - true, ?????? slot0 slot1 slot2 slot3 ...
      - ['name1', 'name2'], ?????? childlimit????????????????????????
      - [{ name: 'name1', style: {width: '100%'}}, 'name2'], ??????????????? slot ???????????????????????????
      - function (props) {}
      ----
      ?????? slot ???????????????????????????slot index?????????????????? slot?????????????????? ??????false
     */
    calcSlots (componentOpts, props) {
      if (!componentOpts) return false;
      let slots = componentOpts.slots;
      if (typeof slots === 'function') slots = slots(props) || false;
      if (typeof slots === 'boolean' && slots) {
        this.$set(this.nodeInfo, 'hasSlot', true);
        return i => ({ name: `slot${i}`, style: null });
      }
      if (slots instanceof Array && slots.length > 0) {
        this.nodeInfo.childLimit = slots.length;
        slots = slots.map((v, i) => {
          return {
            name: typeof v === 'string' ? v : (v && v.name || `slot${i}`),
            style: typeof v === 'string' ? null : v && v.style,
          };
        });
        this.$set(this.nodeInfo, 'hasSlot', true);
        return i => slots[i];
      }
      if (slots && typeof slots === 'object' && ('name' in slots || 'style' in slots)) {
        this.$set(this.nodeInfo, 'hasSlot', true);
        return i => ({ name: slots.name || `slot${i}`, style: slots.style });
      }
      this.$delete(this.nodeInfo, 'hasSlot');
      return false;
    }
  }
};