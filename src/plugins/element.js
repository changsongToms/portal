import Vue from 'vue'
import {
	Button,
	Message,
	MessageBox,
	Container,
	Header,
	Aside,
	Main,
	Image,
	Menu,
	MenuItem,
	Form,
	Input,
	FormItem,
	Radio,
  RadioGroup,
  Table,
  TableColumn,
  Row,
  Col,
  Select,
  Option,
  Tooltip,
  DatePicker,
  PageHeader,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Badge,
  Avatar,
  Tabs,
  TabPane,
  Footer,
  Tree,
  Popover,
  Loading,
  ColorPicker,
  Rate,
  Dialog,
  opconfirm,
  Popconfirm,
  Upload,
  Switch,
  Checkbox
} from 'element-ui'
import waterfall from 'vue-waterfall2'
import infiniteScroll from 'vue-infinite-scroll'
import Picture from 'vue-picture'
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Image)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Form)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Row)
Vue.use(Col)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tooltip)
Vue.use(DatePicker)
Vue.use(PageHeader)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Badge)
Vue.use(Avatar)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tree)
Vue.use(Popover)
Vue.use(Loading.directive)
Vue.use(ColorPicker)
Vue.use(Rate)
Vue.use(Dialog)
Vue.use(Popconfirm)
Vue.use(Upload)
Vue.use(Switch)
Vue.use(Checkbox)
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(infiniteScroll)
Vue.use(waterfall)
Vue.use(Picture)
