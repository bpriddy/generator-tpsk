'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var colors = require('colors');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
	project_domains: [
		{title:'frontend',type:'frontend'},
		{title:'api',type:'service'},
		{title:'cms',type:'admin'}
	],
	domain_types: {
		frontend: {
            "tasks": '"copy", "data", "statics", "templates", "scripts", "styles", "fileserver"'
		},
		service: {
             "tasks": '"copy", "data", "statics", "templates", "copy-scripts", "styles", "service"'
		},
		admin: {
             "tasks": '"copy", "data", "statics", "templates", "scripts", "styles", "fileserver"'
		},
	},
	languages: ["en"],
	initializing: function () {
		this.pkg = require('../package.json');
	},

	prompting: function () {
		var done = this.async();

		this.log(yosay(
			'Thank you for doing the right thing! \n This is a Yeoman generator for starting ' + 'Tool of North America'.green + ' interactive projects!'
		));

		var prompts = [{
			type: 'confirm',
			name: 'configure',
			message: 'Would you like to customize the scaffold of your new project now?'.cyan+'  \nIf not you will get '.gray+'frontend, cms and api'.green+' domains'.yellow+' to work in and only have the '.gray+'en'.green+' '+'language'.yellow+'.  \nIf you would like to manually add '.gray+'domains'.yellow+' to the gulp flow, please edit '.gray+'project.config.json'.green,
			default: true
		}];

		this.prompt(prompts, function (props) {
			if(props.configure) {
				this.log('\n\nToo bad, buster.'.red+'  \nWe\'re not ready for you to configure your project from Yeoman yet.'.yellow+'  \nEnjoy your project.\n\n'.gray)
			} else {
				this.log('\n\nGreat!!!  \nHave a blast!\n\n'.green);
			}
			setTimeout(function() {
				done();
			}, 4000)
		}.bind(this));

	},

	writing: {
		app: function () {

			for(var i=0;i<this.project_domains.length;i++) {
				this.project_domains[i].port = parseInt(3000+i);
				this.project_domains[i].tasks = this.domain_types[this.project_domains[i].type].tasks;
				this.directory("domains/"+this.project_domains[i].type, "src/"+this.project_domains[i].title);
			}
			this.directory("gulp-tasks", "gulp-tasks");
			this.directory("custom_node_modules", "custom_node_modules");
			this.directory("shared", "src/shared");

			this.fs.copy(
				this.templatePath('gulpfile.js'),
				this.destinationPath('gulpfile.js')
			);

			this.fs.copy(
				this.templatePath('_gitignore'),
				this.destinationPath('_gitignore')
			);

			this.fs.copy(
				this.templatePath('README.md'),
				this.destinationPath('README.md')
			);

			var project_config = {
				domains: this.project_domains, 
				languages: this.languages
			}
			this.fs.copyTpl(
				this.templatePath('_project.config.json'),
				this.destinationPath('project.config.json'),
				project_config
			);


			this.fs.copy(
				this.templatePath('_package.json'),
				this.destinationPath('package.json')
			);
			
		},

		projectfiles: function () {

			this.fs.copy(
				this.templatePath('editorconfig'),
				this.destinationPath('.editorconfig')
			);
			this.fs.copy(
				this.templatePath('jshintrc'),
				this.destinationPath('.jshintrc')
			);
		}
	},

	install: function () {

		this.installDependencies({
			skipInstall: this.options['skip-install']
		});
	}
});
