import React from 'react';
import { FlatList, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Container, Button, View, Text, Form, Item, Input, Icon, Spinner,
Card, CardItem, FooterTab, Footer, Left, Right} from 'native-base'
import { Col, Row} from 'react-native-easy-grid'
import encoding from 'text-encoding';

import Header from './header'

var d = new Date();
var n = d.getTime();
var RNFS = require('react-native-fs');
var path = '/storage/emulated/0/' +n+'_'+'result.txt';

export default class DirFinder extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
        isLoading: false, 
        url: '',
        dataSource:[],
        level:'',
        dataUrl:''
    }
  }

  handleCek(){
    this.setState({
      isLoading: true
    })
    let url = this.state.url
    const small = ['adminweb','admin-login.php', 'admin.php', 'administrator/index.html', 'authadmin.php', 'cp.html', 'login_out/', 'admin/', 'signin/', 'administrator.html', 'control/', 'panel-administracion/index.html', 'pages/admin/admin-login.php', 'banneradmin/', 'admincp/index.html', 'users/', 'bigadmin/', 'login/', 'super_indexphp', 'sys-admin/', 'manage.php', 'adm/index.php', 'home.html', 'userlogin.php', 'manager/', 'navSiteAdmin/', 'kpanel/', 'panel/', 'admin2.php', 'admin_area.php', 'home.php', 'adminitems/', 'admin/controlpanel.htm', 'Indy_admin/', 'irc-macadmin/', 'adm.html', 'webadmin/admin.php', 'superuser/', 'panel-administracion/login.php', 'admin/cp.php', 'login1/', 'administrator/login.php', 'panel-administracion/index.php', 'wp-login.php', 'admincontrol.html', 'sshadmin/', 'login.html', 'login_db/', 'admin/login.html', 'supervise/', 'showlogin/', 'member.php', 'project-admins/', 'admin/admin-login.html', 'newsadmin/', 'hpwebjetadmin/', 'radmind-1/', 'administr8.php', 'cpanel_file/', 'panel-administracion/admin.php', 'acceso.php', 'modelsearch/index.html', 'sign-in.php', 'bb-admin/', 'moderator/login.html', 'webadmin.html', 'control.php', 'superman/', 'authentication.php', 'user/', 'accounts/', 'webmaster.php', 'members/', 'secrets/', 'sign-in/', 'adm/admloginuser.php', 'login.htm', 'moderator/admin.html', 'admincp/', 'adminpanel.html', 'super1php', 'administrator/login.html', 'phpldapadmin/', 'ServerAdministrator/', 'bb-admin/login.php', 'admin/admin_login.php', 'logout/', 'checklogin.php', 'members.php', '0admin/', 'adminitems.php', 'admin1.php', 'adminarea/index.php', 'Server/', 'ur-admin/', 'sysadm.php', 'signin.php', 'admin2/', 'admin2.html', 'log_in.php', 'webadmin.php', 'user.php', 'ccp14admin/', 'admincontrol/login.html', 'webadmin/login.html', 'auth.php', 'admin1/', 'administr8/', 'superuserphp', 'meta_login/', 'login_outphp', 'admincontrol/', 'sysadmin.php', 'check.php', 'cadmins/', 'administratorlogin/', 'adm/index.html', 'smblogin/', 'siteadmin/login.html', 'login_userphp', 'controlpanel/', 'administratie/', 'member/', 'Super-Admin/', 'log-in/', 'user.html', 'login_adminphp', 'bb-admin/admin.html', 'memberadmin/', 'administration/', 'admin/home.html', 'relogin.html', 'adminpro/', 'adminitem/', 'bb-admin/login.html', 'admin/adminLogin.html', 'administrator/account.html', 'supervisor/', 'authenticate.php', 'sign_in/', 'root/', 'admin2/index.php', 'moderator/', 'pages/admin/', 'login1php', 'logoutphp', 'adminlogin.php', 'wp-admin/', 'admins.php', 'server_admin_small/', 'adminarea/admin.php', 'admin/admin.php', 'admincp/index.asp', 'security/', 'panel-administracion/admin.html', 'bb-admin/admin.php', 'admin1.htm', 'loginsuper/', 'cmsadmin/', 'pgadmin/', 'login_admin/', 'admincontrol/login.php', 'radmind/', 'ur-admin.php', 'LiveUser_Admin/', 'admin_area/', 'modules/admin/', 'admincp/login.asp', 'admin.htm', 'supervise/Loginphp', 'admin/admin-login.php', 'siteadmin/', 'adminarea/login.php', 'panel.php', 'SysAdmin2/', 'loginsave/', 'access/', 'modelsearch/admin.php', 'admin/login.php', 'pureadmin/', 'ss_vms_admin_sm/', 'PSUser/', 'adminarea/index.html', 'yonetici.html', 'access.php', 'vorud/', 'adminLogin/', 'admin/account.php', 'adminpanel/', 'isadmin.php', 'yonetici.php', 'loginerror/', 'bb-admin/index.html', 'admin/index.php', 'secret/', 'Server.php', 'loginsuperphp', 'administrators/', 'admin/cp.html', 'nsw/admin/login.php', 'admin/home.php', 'cmsadmin.php', 'admin.html', 'admin/adminLogin.php', 'usr/', 'admin_area/login.html', 'log-in.php', 'sysadm/', 'user/admin.php', 'rcjakar/admin/login.php', 'bbadmin/', 'webadmin/index.html', 'relogin.php', 'moderator/login.php', 'secure/', 'letmein/', 'fileadmin/', 'simpleLogin/', 'login-redirect/', 'cp.php', 'admin4_colon/', 'admin_area/index.php', 'globes_admin/', 'system_administration/', 'usuario/', 'adminitem.php', 'processlogin.php', 'management/', 'admin/index.html', 'panel-administracion/', 'admin_area/admin.html', 'adminLogin.html', 'Database_Administration/', 'vmailadmin/', 'checkuser.php', 'adminsite/', 'siteadmin/login.php', 'wizmysqladmin/', 'administrator.php', 'staradmin/', 'pages/admin/admin-login.html', 'typo3/', 'vorod.php', 'adminarea/admin.html', 'admins/', 'UserLogin/', 'phppgadmin/', 'cpanel/', 'admin_area/admin.php', 'Lotus_Domino_Admin/', 'loginok/', 'admin2/login.php', 'adminarea/login.html', 'siteadmin.php', 'myadmin/admin.php', 'superuser.php', 'vadmind/', 'sysadmins/', 'manage/', 'acct_login/', 'modelsearch/login.html', 'adminLogin.php', 'uvpanel/', 'administrivia/', 'superphp', 'loginphp', 'SysAdmin/', 'usuarios/login.php', 'bb-admin/index.php', 'phpmyadmin/', 'affiliate.php', 'authuser.php', 'webadmin/index.php', 'customer_login/', 'admloginuser.php', 'supermanphp', 'loginflat/', 'administrator/', 'aadmin/', 'users.php', 'admin5/', 'yonetim.html', 'admin/controlpanel.php', 'autologin/', 'modelsearch/login.php', 'super1/', 'super_loginphp', 'supermanagerphp', 'admin/admin_login.html', 'phpSQLiteAdmin/', 'log_in/', 'sql-admin/', 'admin4_account/', 'login-us/', 'openvpnadmin/', 'admin_area/login.php', 'vorud.php', 'registration/', 'controlpanel.html', 'utility_login/', 'administrator/account.php', 'usuarios/', 'admin_login.php', 'ezsqliteadmin/', 'webmaster/', 'vorod/', 'useradmin/', 'logo_sysadmin/', 'administratorlogin.php', 'admin/controlpanel.html', 'users/admin.php', 'cp/', 'admin/adminLogin.htm', 'siteadmin/index.php', 'support_login/', 'adm.php', 'administrators.php', 'accounts.php', 'moderator.php', 'controlpanel.php', 'AdminTools/', 'admin_login.html', 'account.php', 'cgi-bin/loginphp', 'moderator/admin.php', 'admin/login.htm', 'login.php', 'management.php', 'blogindex/', 'webadmin/admin.html', 'instadmin/', 'sign_in.php', '0manager/', 'sub-login/', 'power_user/', 'administer/', 'administratoraccounts/', 'platz_login/', 'admin/account.html', 'fileadmin.php', 'memberadmin.php', 'adm/', 'manuallogin/', 'blog/wp-login.php', 'administrator/index.php', 'xlogin/', 'adminarea/', 'panel-administracion/login.html', 'admincontrol.php', 'checkadmin.php', 'wp-login/', 'admincp/login.php', 'adminpanel.php', 'relogin.htm', 'rcLogin/', 'autologin.php', 'formslogin/', 'yonetim.php', 'admin-login.html', 'account.html', 'adm_auth.php', 'admin3/', 'dir-login/', 'admin/admin.html', 'directadmin/', 'webadmin/', 'letmein.php', 'modelsearch/admin.html', 'admin4/', 'memlogin/', 'moderator.html', 'system-administration/', 'webadmin/login.php', 'manager.php', 'admin_area/index.html', 'macadmin/', 'modelsearch/index.php', 'admin1.html', 'administration.php', 'admin_panel/', '4dm1n/', 'Lotus_Domino_Admin/', 'adminganteng/', 'adminkece/', 'sayaganteng/', 'jangansentuh/', 'maumasuk/', 'adminsangar/', 'menanti/', 'admingaul/', 'admin_kasep/', 'adminkasep/', 'aduh/', 'oke/', 'ini_login/', 'inilogin/', 'iniLogAdmin/', 'iniAdmin/', 'IniAdmin/', 'iniadmin/', 'Ini_Admin/', 'ini_admin/', 'mauhack/', 'login100/', 'maulogin/', 'jangannakal/', 'JanganNakal/', 'Jangan_Nakal/', 'admin_area/login.html', 'admin/adminLogin.cgi', 'siteadmin/login.html', 'panel-administracion/login.brf', 'Database_Administration/', 'adminpanel.cgi', 'adminLogin.cfm', 'siteadmin/login.cfm', 'project-admins/', 'aadmin/', 'admins.cgi', 'sysadmin.brf', 'admins/', 'admin2/login.cfm', 'admin_area/login.cgi', 'webadmin/admin.brf', 'yonetici.html', 'adm.brf', 'admin.cfm', 'admin_area.cgi', 'adminarea/index.brf', 'checkadmin.brf', 'vorod/', 'log-in/', 'admin2/index.brf', 'panel-administracion/', 'admin/admin.html', 'administration.brf', 'sign-in.cgi', 'modelsearch/login.cfm', 'moderator.cgi', 'modelsearch/login.html', 'administrator/login.cfm', 'affiliate.cgi', 'processlogin.brf', 'sub-login/', 'autologin.cgi', 'administr8.cgi', 'modelsearch/index.html', 'login.brf', 'admin.brf', 'moderator/', 'usuarios/login.brf', 'adm.cgi', 'admin1.htm', 'webmaster/', 'account.brf', 'adm_auth.cgi', 'superuser/', 'supermanagercgi', 'adm_auth.cfm', 'wizmysqladmin/', 'admin_area/admin.brf', 'user.brf', 'log_in.brf', 'bigadmin/', 'sysadm.brf', 'acct_login/', 'admin-login.html', 'signin/', 'administratie/', 'administratorlogin/', 'admincp/login.cgi', 'moderator.cfm', 'usr/', 'SysAdmin/', 'administratorlogin.brf', 'home.brf', 'adm/index.cfm', 'cpanel_file/', 'login.cfm', 'adm/admloginuser.cfm', 'vorod.brf', 'controlpanel.brf', 'SysAdmin2/', '0manager/', 'webmaster.cgi', 'administrators/', 'admin/adminLogin.html', 'administrator/index.html', 'controlpanel/', 'adminLogin.brf', 'control.cgi', 'moderator/admin.html', 'check.cgi', 'phpSQLiteAdmin/', 'admin/controlpanel.htm', 'signin.brf', 'admin_area/login.brf', 'radmind/', 'administrators.cgi', 'acceso.cfm', 'sign_in/', 'webmaster.brf', 'cgi-bin/logincgi', 'admin/account.cgi', 'user.cgi', 'modelsearch/admin.brf', 'loginsuper/', 'adminlogin.cgi', 'supercgi', 'login_adminbrf', 'banneradmin/', 'modelsearch/index.brf', 'hpwebjetadmin/', 'admin4_colon/', 'affiliate.brf', 'authuser.brf', 'adminarea/login.html', 'sysadm.cgi', 'webadmin/index.html', 'admin_area/admin.cgi', 'admin/admin_login.cfm', 'members/', 'globes_admin/', 'cmsadmin.cgi', 'admin/cp.html', 'controlpanel.cgi', 'authadmin.cgi', 'admin/admin-login.cgi', 'super1/', 'accounts.cgi', 'admincontrol/', 'cpanel/', 'phppgadmin/', 'login_usercgi', 'admincp/', 'logincgi', 'bb-admin/index.cfm', 'vmailadmin/', 'log_in.cgi', 'panel-administracion/index.html', 'uvpanel/', 'adminpanel.brf', 'admin/admin_login.html', 'webadmin/admin.html', 'smblogin/', 'supervise/', 'login_admin/', 'webadmin/index.brf', 'UserLogin/', 'super1brf', 'authentication.brf', 'bb-admin/admin.cfm', 'nsw/admin/login.cfm', 'admin/login.html', 'superuser.brf', 'auth.brf', 'administratorlogin.cgi', 'webadmin/admin.cfm', 'control/', 'users/admin.brf', 'siteadmin/index.cfm', 'admin/home.cgi', 'phpmyadmin/', 'user/admin.cgi', 'accounts.brf', 'Server/', 'adminpanel.cfm', 'ur-admin.brf', 'auth.cgi', 'admin1.brf', 'yonetim.cgi', 'super_indexbrf', 'memlogin/', 'login.htm', 'ezsqliteadmin/', 'superuserbrf', 'supermancgi', 'authadmin.brf', 'admin/controlpanel.cgi', 'showlogin/', 'adm_auth.brf', 'Indy_admin/', 'admincontrol.html', 'openvpnadmin/', 'vorud/', 'relogin.brf', 'isadmin.cgi', 'access/', 'registration/', 'admin4/', 'cmsadmin/', 'webadmin.brf', 'admincontrol/login.cfm', 'pgadmin/', 'admin/index.html', 'admin-login.brf', 'ur-admin/', 'relogin.cgi', 'cp.brf', 'blog/wp-login.brf', 'moderator/login.html', 'adm.html', 'controlpanel.cfm', 'loginbrf', 'admin/admin-login.cfm', 'administrator/index.cfm', 'adminsite/', 'manage.cgi', 'relogin.htm', 'admin1.html', 'adminarea/admin.brf', 'home.cfm', 'admin/admin.cgi', 'super1cgi', 'administration/', 'admin/admin-login.brf', 'home.html', 'supervise/Loginbrf', 'modelsearch/index.cfm', 'manuallogin/', 'sign_in.brf', 'admin/cp.cfm', 'memberadmin/', 'adminLogin.html', 'login_outbrf', 'admin/adminLogin.htm', 'ccp14admin/', 'modules/admin/', 'admincontrol/login.html', 'newsadmin/', 'administrator.cfm', 'modelsearch/admin.cfm', 'administr8/', 'checkuser.cgi', 'panel-administracion/login.cfm', 'bbadmin/', 'secrets/', 'admin/home.brf', 'webadmin/login.cfm', 'yonetici.cgi', 'adminarea/admin.cfm', 'power_user/', 'administrator/login.html', 'secret/', 'admin_area/login.cfm', 'manager/', 'sysadmin.cgi', 'myadmin/', 'wp-login.cfm', 'cp.cgi', 'panel/', 'admin_area.brf', 'vorud.cgi', 'adminLogin/', 'bb-admin/login.brf', 'admin/controlpanel.html', 'sys-admin/', 'macadmin/', 'super_indexcgi', 'user/', 'admin-login.cgi', 'bb-admin/admin.html', 'moderator/login.cgi', 'modelsearch/login.brf', 'memberadmin.cgi', 'access.brf', 'instadmin/', 'security/', 'affiliate.cfm', 'admin.htm', 'typo3/', 'server_admin_small/', 'super_loginbrf', 'isadmin.brf', 'Super-Admin/', 'admloginuser.cfm', 'cp.html', 'admin2.cgi', 'adminarea/login.brf', 'admin_area/admin.cfm', 'panel.cgi', 'user.cfm', 'administrator/index.brf', 'login_userbrf', 'administrator/account.brf', 'webadmin/login.html', 'logout/', 'adm/', 'panel-administracion/admin.cfm', 'admin/cp.brf', 'navSiteAdmin/', 'platz_login/', 'admin/admin_login.brf', 'LiveUser_Admin/', 'yonetim.html', 'manager.cgi', 'vadmind/', 'checklogin.brf', 'dir-login/', 'pages/admin/admin-login.cfm', 'administrator/login.brf', 'directadmin/', 'adminpro/', 'staradmin/', 'admin_area/admin.html', 'admin/admin.brf', 'superuser.cgi', 'utility_login/', 'login/', 'adm/index.html', 'bb-admin/admin.cgi', 'phpldapadmin/', 'bb-admin/login.cfm', 'admin/login.cgi', 'manage/', 'rcjakar/admin/login.cfm', 'modelsearch/admin.html', 'sql-admin/', 'supermanbrf', 'admin5/', 'usuario/', 'moderator.html', 'admin_area/', 'acceso.cgi', 'irc-macadmin/', 'bb-admin/admin.brf', 'rcjakar/admin/login.brf', 'admin/account.cfm', 'letmein.brf', 'adminitem.brf', 'administr8.brf', 'adminarea/index.cfm', 'meta_login/', 'adminitems/', 'webadmin/', 'pureadmin/', 'admin/controlpanel.cfm', 'admincp/index.html', 'webadmin.html', 'wp-login/', 'fileadmin.cgi', 'admin_login.cgi', 'Server.cgi', 'sign-in.brf', 'root/', 'panel-administracion/index.brf', 'bb-admin/index.brf', 'fileadmin.brf', 'adminitems.cgi', 'administrator.brf', 'simpleLogin/', 'loginerror/', 'admincontrol.brf', 'moderator.brf', 'access.cgi', 'logoutbrf', 'superman/', 'panel-administracion/login.html', 'moderator/login.brf', 'signin.cgi', 'sysadm/', 'member.cgi', 'moderator/admin.cgi', 'usuarios/', 'admincontrol.cfm', 'logo_sysadmin/', 'admin_area/index.cfm', 'admin2.cfm', 'letmein.cgi', 'autologin/', 'administrator/login.cgi', 'adminarea/login.cfm', 'AdminTools/', 'members.cgi', 'admin2/', 'supervise/Logincgi', 'login_outcgi', 'pages/admin/admin-login.brf', 'admin/cp.cgi', 'loginsave/', 'member/', 'logoutcgi', 'manager.brf', 'fileadmin/', 'check.brf', 'pages/admin/', 'account.cfm', 'adm.cfm', 'system-administration/', 'management/', 'nsw/admin/login.brf', 'administratorlogin.cfm', 'admin/admin.cfm', 'user.html', 'admin/', 'administrator/', 'accounts/', 'login_db/', 'admin/home.cfm', 'webadmin.cgi', 'manage.brf', 'log-in.brf', 'admin/account.html', 'admin/index.cfm', 'user/admin.brf', 'adminitem/', 'wp-login.php', 'admin/login.brf', 'administrator/account.cgi', 'system_administration/', 'loginflat/', 'login-redirect/', 'loginok/', 'log-in.cgi', 'loginsuperbrf', 'ur-admin.cgi', 'login_out/', 'panel-administracion/admin.brf', 'admin2/index.cfm', 'vorod.cgi', 'kpanel/', 'admin_login.brf', 'cp.cfm', 'useradmin/', 'admin-login.cfm', 'moderator/login.cfm', 'management.cgi', 'administrivia/', 'ServerAdministrator/', 'memberadmin.cfm', 'users/', 'login.html', 'authenticate.cgi', 'administrator/account.html', 'Server.brf', 'sign_in.cgi', 'admloginuser.brf', 'yonetim.brf', 'log_in/', 'admin/home.html', 'wp-login.brf', 'admin.cgi', 'admin_login.cfm', 'formslogin/', 'memberadmin.brf', 'userlogin.brf', 'administration.cgi', 'admin/admin-login.html', 'admin2/login.brf', 'moderator.php', 'administer/', 'administrator.html', 'bb-admin/index.html', 'loginsupercgi', 'modelsearch/login.cgi', 'blogindex/', 'rcLogin/', 'users.brf', 'siteadmin/login.brf', 'authentication.cgi', 'authuser.cgi', 'authenticate.brf', 'control.brf', 'adminitems.brf', 'autologin.brf', 'admin1.cgi', 'admin.html', 'adminpanel.html', 'acceso.brf', 'secure/', 'sshadmin/', 'bb-admin/', 'admin/index.brf', 'pages/admin/admin-login.cgi', 'adminarea/index.html', 'adminarea/', 'login-us/', 'userlogin.cgi', 'users/admin.cgi', 'cadmins/', 'checkuser.brf', 'adminpanel/', 'PSUser/', 'administratoraccounts/', 'cgi-bin/loginbrf', 'users.cgi', 'adminitem.cgi', 'supermanagerbrf', 'usuarios/login.cfm', 'webadmin/login.brfbrf', 'admin/admin_login.cgi', 'wp-admin/', 'login1cgi', 'super_logincgi', 'admin/adminLogin.cfm', 'yonetici.brf', 'member.brf', 'panel.brf', 'adminarea/admin.html', 'login1brf', 'siteadmin.brf', 'adm/index.brf', 'admin_login.html', 'admin3/', 'vorud.brf', 'panel-administracion/admin.html', 'controlpanel.html', 'customer_login/', 'management.brf', 'admin2.brf', 'panel-administracion/login.cgi', 'checklogin.cgi', 'admin_area/index.brf', 'siteadmin/', 'admincp/login.brf', 'admin1/', 'admin2.html', 'admin_area/index.html', 'checkadmin.cgi', 'pages/admin/admin-login.html', 'letmein/', 'admin/controlpanel.brf', 'superusercgi', 'cmsadmin.brf', 'supervisor/', 'login1/', 'adminlogin.brf', 'account.html', 'sysadmins/', 'ss_vms_admin_sm/', 'moderator/admin.brf', 'moderator/admin.cfm', 'admincontrol.cgi', 'members.brf', 'admin/login.htm', 'radmind-1/', 'bb-admin/login.html', 'login_admincgi', 'processlogin.cgi', 'administrator.cgi', 'admin/login.cfm', 'bb-admin/login.cgi', 'admins.brf', 'admin/account.brf', 'admin4_account/', 'panel-administracion/index.cfm', 'login.cgi', 'admincontrol/login.brf', 'webadmin.cfm', 'relogin.html', 'blog/wp-login.cgi', 'admin/adminLogin.brf', 'adm/admloginuser.brf', 'webadmin/index.cfm', 'support_login/', 'administrator/account.cfm', 'superbrf', '0admin/', 'sign-in/', 'xlogin/', 'siteadmin.cgi', 'cp/', 'siteadmin/index.brf', 'administrators.brf']
    const medium = ['amin.go.id', 'popo']
    const extreme = ['bismawin']

    const uri = 'https://'+`${url}`+'/'
        if (this.state.level === 'easy') {
            small.map((item)=>{

                return fetch(uri+item)
                .then((response) => {
                    if (response.status === 200) {
                        this.setState({
                          dataSource: this.state.dataSource.concat([response.url]),
                          dataUrl: response.url,
                          isLoading:false,
                        })
                    }else{
                        null
                    }
                }).catch(err => {
                    this.setState({
                        isLoading:false
                    })
                })
                
        
            })
        }else if (this.state.level === 'medium') {
            medium.map((item)=>{

                return fetch(uri+item)
                .then((response) => {
                    if (response.status === 200) {
                        this.setState({
                          dataSource: this.state.dataSource.concat([response.url]),
                          isLoading: false
                        })
                    }else{
                        null
                    }})
        
            }).then(err => {
                this.setState({
                    isLoading:false
                })
                alert(err)
            })
        }else if (this.state.level === 'extreme') {
            extreme.map((item)=>{

                return fetch(uri+item)
                .then((response) => {
                    if (response.status === 200) {
                        this.setState({
                          dataSource: this.state.dataSource.concat([response.url]),
                          isLoading: false
                        })
                    }else{
                        this.setState({
                            isLoading:false
                        })
                    }})
        
                })
        }
  }


  toFile(){
    var uint8array = new encoding.TextEncoder("utf-8").encode(this.state.dataSource);
    var string = new encoding.TextDecoder().decode(uint8array);
    RNFS.writeFile(path, string, 'utf8')
      .then((success) => {
        alert('FILE TERSIMPAN di '+path);
    })
    .catch((err) => {
      alert(err.message);
    });
  
  }

//   readFile(){
//     fetch('http://testing.an-creator.id/test.txt')
//     .then((r) => r.text())
//     .then(text  => {
//       console.log(text);
//     })  
//   };

  render(){
    return(
      <Container>
        <Header/>
        <Text> Choose Level : </Text>
            <Row style={{height:42, paddingLeft:16, paddingTop:16}}>
                <Col>
                    {
                        this.state.level === 'easy' ? (
                            <Icon name="md-checkmark-circle"  style={{color:'#86bc40', position:'absolute', zIndex:100, alignSelf:'center', width:42, height:42}}/>
                        ): null
                    }
                    <TouchableOpacity onPress={() => this.setState({level: 'easy'})}>
                        <Image source={require('./ico/easy.png')} style={{width:42, height:42}} /> 
                    </TouchableOpacity> 
                    <Text style={{fontSize: 10, fontWeight: 'bold',}}>Easy Peazy</Text>
                </Col>
                <Col>
                    {
                        this.state.level === 'medium' ? (
                            <Icon name="md-checkmark-circle"  style={{color:'#86bc40', position:'absolute', zIndex:100, alignSelf:'center', width:42, height:42}}/>
                        ): null
                    }
                    <TouchableOpacity>
                        <Image source={require('./ico/medium.png')} style={{width:42, height:42}} /> 
                    </TouchableOpacity> 
                    <Text style={{fontSize: 10, fontWeight: 'bold',}}>Medium(Cooming Soon)</Text>
                </Col>
                <Col>
                    {
                        this.state.level === 'extreme' ? (
                            <Icon name="md-checkmark-circle"  style={{color:'#86bc40', position:'absolute', zIndex:100, alignSelf:'center', width:42, height:42}}/>
                        ): null
                    }
                    <TouchableOpacity>
                        <Image source={require('./ico/extreme.jpg')} style={{width:42, height:42}} /> 
                    </TouchableOpacity> 
                    <Text style={{fontSize: 10, fontWeight: 'bold',}}>Extreme(Cooming Soon)</Text>
                </Col>
            </Row>
           {
               this.state.level.length != 0 ? (
                <View style={{flex:1}}>
                    <Form style={{paddingBottom:16, paddingTop:20}}>
                        <Item floatingLabel>
                            <Input placeholder="site.com" onChangeText={(url) => this.setState({url : url})} />
                        </Item>
                    </Form>
                <Button block primary onPress={() => this.handleCek()}>
                    {
                        this.state.isLoading == true ? (
                            <Spinner color='white'/>
                        ):(
                            <Text style={{color:'white'}}>Scan : {this.state.level}</Text>
                        )
                    }
                </Button>
                <Text>Result :</Text>
                <ScrollView>
                    <FlatList
                        data={this.state.dataSource}
                        renderItem={({item}) => <Text>{item} <Icon style={{color:'#86bc40'}} name="md-checkmark" /></Text>}
                        keyExtractor={(item, index) => index}
                    />
                </ScrollView>

                    
                </View>
               ):(
                   <View style={{flex:1, flexDirection:'column', alignSelf:'center', justifyContent:'center'}}>
                       <Text style={{fontSize: 10, fontWeight: 'bold', alignSelf: 'center',}}>Pilih Level Scanning Terlebih dahulu. Saat ini hanya tersedia level Easy Peazy</Text>
                       <Text style={{alignSelf: 'center',paddingTop:10}}>Follow ig : @penulis.bimbang</Text>
                   </View>
               )
           }
           <Footer style={{backgroundColor:'#86bc40'}}>
                <FooterTab style={{backgroundColor:'#86bc40'}}>
                    {
                        this.state.level.length == 0 ? (
                            <Row>
                                <Text style={{fontWeight:'bold', color:'white', alignItems: 'center', alignSelf: 'center', justifyContent:'center', paddingLeft:20}}>Copyright 2018. M1n007 - </Text>
                            <TouchableOpacity  onPress={ ()=>{ Linking.openURL('http://an-creator.id/')}}><Text style={{fontWeight:'bold', color:'white', alignItems: 'center', paddingTop:18}}>An-Creator.id</Text></TouchableOpacity>
                            </Row>
                        ):
                        this.state.dataSource.length == 0 ? (
                            <Row>
                                <Button style={{backgroundColor:'grey', position:'absolute'}}>
                                    <Text style={{color:'white'}}>Save Result</Text>
                                </Button>
                            </Row>
                            ):(
                            <Row>
                                <Left>
                                <Button primary onPress={()=> this.toFile()}>
                                <Text style={{color:'white'}}>Save Result</Text>
                                </Button>
                                </Left>
                                <Right>
                                <Text style={{fontSize:10, color:'white'}}>Progress :{"\n"} {this.state.dataUrl}</Text>
                                </Right>
                            </Row>
                        )
                    }
                </FooterTab>
            </Footer>
      </Container>
    );
  }
}
