module.exports = {
	port: process.env.PORT,
	open: false,
	logLevel: "silent",
	files: ['./**/*.{html,htm,css,js}'],
	server:{
		baseDir: "./dist",
		middleware: {
			0: null
		}
	}
};