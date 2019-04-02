import Link from 'next/link';
import NavStyles from './styles/NavStyles'

import NProgress from 'nprogress';
import Router from 'next/router';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

export default () => {
  return (
    <NavStyles>
      <Link href="/items"><a>items</a></Link>
      <Link href="/sell"><a>sell</a></Link>
      <Link href="/signup"><a>signup</a></Link>
      <Link href="/orders"><a>orders</a></Link>
      <Link href="/me"><a>Account</a></Link>
    </NavStyles>
  )
}