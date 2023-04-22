import { boot } from 'quasar/wrappers'

export default boot(async ( { app } ) => {
	app.mixin({
		methods: {
			isRequired(val) {
				if (typeof val === 'object' && val !== null) {
					if (val.length === 0) return 'Este es un campo requerido';
					else return val
				} else {
					return !!val || 'Este es un campo requerido';
				}
			},

			isValidEmail(val) {
				const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
				return emailPattern.test(val) || 'Correo no válido';
			},

			isValidUsername(val) {
				const usernamePattern = /^[A-Za-z0-9_-]{3,15}$/;
				return usernamePattern.test(val) || 'Usuario no válido';
			},

			onlyNumbers(val) {
				const usernamePattern = /^[0-9]*$/;
				return usernamePattern.test(val) || 'Solo se permiten números';
			},

			needNumber(val) {
				const pattern = /.*[0-9].*/;
				return pattern.test(val) || 'Indique al menos un número'
			},

			needLower(val) {
				const pattern = /.*[a-z]/;
				return pattern.test(val) || 'Indique al menos una minúscula'
			},

			needUpper(val) {
				const pattern = /.*[A-Z]/;
				return pattern.test(val) || 'Indique al menos una mayúscula'
			},

			needSpecialChar(val) {
				const pattern = /.*[¡!@#$%^&*(),.¿?:{}|<>]/;
				return pattern.test(val) || 'Indique al menos una caracter especial'
			},

			need10Length(val) {
				if (val) {
					return val.length >= 10 || 'Escriba al menos 10 caracteres';
				}
			},

      yearLength(val){
			  if(val){
          return val.toString().length <= 4 || 'Escriba máximo 4 caracteres';
        }
      }

		}
	});
})
