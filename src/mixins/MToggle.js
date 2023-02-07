export default {
    name: 'm-toggle',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hideModal() {
            this.$emit('update:show', false)
        }
    },
    mounted() {

    }
}