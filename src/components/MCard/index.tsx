/*
 * @Author: wjc
 * @Date: 2024-07-12 10:46:19
 * @LastEditors: wjc
 * @LastEditTime: 2024-07-12 15:02:10
 * @Description:
 */
import { Fragment } from 'vue'
import './styles.scss'

export default defineComponent({
  name: 'MCard',
  props: {
    bgColor: {
      type: String,
      default: 'var(--bg-card)',
    },
    rounded: {
      type: Boolean,
      default: true,
    },
    padding: {
      type: Number,
      default: 16,
    },
    border: {
      type: Boolean,
      default: true,
    },
    spacer: {
      type: Boolean,
      default: true,
    },
    space: {
      type: Boolean,
      default: true,
    },
    justify: {
      type: String as PropType<'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'>,
      default: 'start',
    },
    direction: {
      type: String as PropType<'vertical' | 'horizontal'>,
      default: 'vertical',
    },
    align: {
      type: String,
      default: 'center',
    },
  },
  setup(props, { slots }) {
    const spaceClass = computed(() => {
      if (props.space) {
        let cls = `flex gap-8px items-${props.align}`
        if (props.direction === 'vertical') {
          cls = cls + ' flex-col'
        }
        if (props.justify) {
          cls = cls + ` justify-${props.justify}`
        }
        return cls
      } else {
        return ''
      }
    })
    return {
      spaceClass,
    }
  },
  render() {
    const { spaceClass, rounded, padding, bgColor, spacer, direction } = this
    const children = this.$slots.default()

    return (
      <view
        class={[`${rounded ? 'm-card rounded-12px' : 'm-card'}`, spaceClass]}
        style={{ padding: `${padding}px`, background: `${bgColor}` }}
      >
        {children.map((child, i, arr) => {
          return (
            <>
              <view class={['m-card-item']}>{child}</view>
              {i !== arr.length - 1 && spacer ? (
                <view
                  class={[direction === 'horizontal' ? 'm-card-spacer-horiz' : 'm-card-spacer']}
                ></view>
              ) : null}
            </>
          )
        })}
      </view>
    )
  },
})
