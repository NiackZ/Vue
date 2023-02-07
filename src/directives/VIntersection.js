export default {
    name: 'intersection',
    mounted(el, binding) {
        const options = {
          rootMargin: '0px',
          threshold: 1.0
        }

        const cb = (entries, observer) => {
          if (entries[0].isIntersecting) {
              binding.value()
          }
        }
        const obs = new IntersectionObserver(cb, options)
        obs.observe(el)
    }
}