<?php
defined('BASEPATH') or exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['404_override'] = '';
$route['translate_uri_dashes'] = false;

$route['recipes/(:any)'] = 'recipes/view/$1';
$route['calendar'] = 'calendar';

$route['auth/login']['get'] = 'auth/get_login';
$route['auth/register']['get'] = 'auth/get_register';

$route['auth/login']['post'] = 'auth/post_login';
$route['auth/register']['post'] = 'auth/post_register';
$route['auth/logout'] = 'auth/logout';

$route['comments/create']['post'] = 'comments/create';
$route['comments/delete']['post'] = 'comments/delete';

$route['api/comments/(:num)']['get'] = 'comments/api_get/$1';
$route['api/comments/create']['post'] = 'comments/api_create';
$route['api/comments/delete/(:num)']['post'] = 'comments/api_delete/$1';

$route['api/auth/login']['post'] = 'auth/api_post_login';
$route['api/auth/register']['post'] = 'auth/api_post_register';


$route['(:any)'] = 'pages/view/$1';
$route['default_controller'] = 'pages/view';
