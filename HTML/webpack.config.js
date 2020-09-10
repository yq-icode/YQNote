var path = require('path');

module.exports = {
	mode: 'development',
  	entry: './src/test/test.js',
  	output: {
    	path: path.resolve(__dirname, 'dist'),
    	filename: 'test.bundle.js'
  	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:['style-loader', 'css-loader']
			},{
				test:/\.(png|svg|jpg|gif)$/,
				use:['file-loader']
			},{
				test:/\.(woff|woff2|eot|otf)$/,
				use:['file-loader']
			}		
		]
	}
};
