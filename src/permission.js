import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import Cookies from 'js-cookie'
import axios from 'axios'

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start() 
  if(Cookies.get('login_name')) {  
    Cookies.set('login_name', Cookies.get('login_name'), { expires: 0.01 });
    if(to.path=='/') router.replace({path: '/userIndex'})   
    next();
  } else {
    //用户登陆信息失效    
    if(to.path!=='/') router.replace({path: '/'})      
    next();
    NProgress.done() 
  }  
})

document.addEventListener('click',function(event){
  if(Cookies.get('login_name')) {  
    Cookies.set('login_name', Cookies.get('login_name'), { expires: 0.01 });
    if(window.location.hash=='#/') router.replace({path: '/userIndex'})   
  } else {
    //用户登陆信息失效    
    if(window.location.hash!=='#/') router.replace({path: '/'})      
  }  
})

axios.interceptors.request.use(function(config) {
  return config;
});
axios.interceptors.response.use(function(response) {
  console.log(response.data)
  return response;
})
router.afterEach(() => {
  NProgress.done() 
})
