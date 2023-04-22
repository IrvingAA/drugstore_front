import { boot } from 'quasar/wrappers'

export default boot(async ( { app } ) => {
	app.mixin({
		methods: {
			showError (title, message) {
				this.$q.notify({
					type: 'negative',
					message: title,
					caption: message
				});
			},
			showSuccess (title, message) {
				this.$q.notify({
					type: 'positive',
					message: title,
					caption: message
				});
			},
			showInfo (title, message) {
				this.$q.notify({
					type: 'info',
					message: title,
					caption: message
				});
			},
			showWarning (title, message) {
				this.$q.notify({
					type: 'warning',
					message: title,
					caption: message
				});
			}
		}
	});
})
