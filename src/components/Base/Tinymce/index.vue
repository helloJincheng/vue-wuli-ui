<template>
	<div :class="{fullscreen: fullscreen}" class="tinymce-container editor-container">
		<textarea :id="tinymceId" class="tinymce-textarea" />
		<div class="editor-custom-btn-container"></div>
	</div>
</template>

<script>
import plugins from './plugins'
import toolbar from './toolbar'

export default {
  name: 'Tinymce',
	props: {
		id: {
			type: String,
			default: function() {
				return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
			}
		},
		value: {
			type: String,
			default: ''
		},
		toolbar: {
			type: Array,
			required: false,
			default() {
				return []
			}
		},
		menubar: {
			type: String,
			default: '文件编辑器插入table'
		},
		height: {
			type: Number,
			default: 360
		}
	},
	data() {
		return {
			hasChange: false,
			hasInit: false,
			tinymceId: this.id,
			fullscreen: false
		}
	},
	watch: {
		value(val) {
			if (!this.hasChange && this.hasInit) {
				this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val || ''))
			}
		}
	},
	mounted() {
		this.initTinymce()
	},
	activated() {
		this.initTinymce()
	},
	deactivated() {
		this.destroyTinymce()
	},
	destroyed() {
		this.destroyTinymce()
	},
	methods: {
		initTinymce() {
			const _this = this;
			this.dataBase.load('tinymce',() => {
				window.tinymce.init({
					language: 'zh_CN',
					selector: `#${this.tinymceId}`,
					height: this.height,
					body_class: 'panel-body ',
					object_resizing: false,
					toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
					menubar: this.menubar,
					plugins: plugins,
					end_container_on_empty_block: true,
					powerpaste_word_import: 'clean',
					code_dialog_height: 450,
					code_dialog_width: 1000,
					advlist_bullet_styles: 'square',
					advlist_number_styles: 'default',
					imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
					default_link_target: '_blank',
					link_title: false,
					nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
					init_instance_callback: editor => {
						if (_this.value) {
							editor.setContent(_this.value)
						}
						_this.hasInit = true
						editor.on('NodeChange Change KeyUp SetContent', () => {
							this.hasChange = true
							this.$emit('input', editor.getContent())
						})
					},
					setup(editor) {
						editor.on('FullscreenStateChanged', (e) => {
							_this.fullscreen = e.state
						})
					}
				});
			});
		},
		destroyTinymce() {
			const tinymce = window.tinymce.get(this.tinymceId)
			if (this.fullscreen) {
				tinymce.execCommand('mceFullScreen')
			}

			if (tinymce) {
				tinymce.destroy()
			}
		},
		setContent(value) {
			window.tinymce.get(this.tinymceId).setContent(value)
		},
		getContent() {
			window.tinymce.get(this.tinymceId).getContent()
		},
		imageSuccessCBK(arr) {
			const _this = this
			arr.forEach(v => {
				window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
			});
		}
	}
}
</script>

<style scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}
.tinymce-container>>>.mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>
