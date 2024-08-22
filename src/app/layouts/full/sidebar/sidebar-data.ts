import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Servicios',
  },
  {
    displayName: 'Michis',
    iconName: 'cat',
    route: '/ui-components/michis',
  },
  {
    displayName: 'Donar',
    iconName: 'moneybag',
    route: '/ui-components/donar',
  },
  {
    displayName: 'Solicitudes',
    iconName: 'files',
    route: '/ui-components/solicitudes',
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
  },
/*   {
    navCap: 'Extra',
  },
  {
    displayName: 'Icons',
    iconName: 'mood-smile',
    route: '/extra/icons',
  },
  {
    displayName: 'Sample Page',
    iconName: 'aperture',
    route: '/extra/sample-page',
  }, */
];
