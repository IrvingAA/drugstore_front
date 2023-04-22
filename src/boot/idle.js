import { boot } from 'quasar/wrappers'
import emitter from 'tiny-emitter/instance'
import IdleVue from 'idle-vue'

export default boot(async ( { app } ) => {
	const eventsHub = {
		$on: (...args) => emitter.on(...args),
		$once: (...args) => emitter.once(...args),
		$off: (...args) => emitter.off(...args),
		$emit: (...args) => emitter.emit(...args)
	}

	app.use(IdleVue, {
		eventEmitter: eventsHub,
		idleTime: 45/*Minutes*/ * 60/*Seconds*/ * 1000/*Miliseconds*/
	})
})
