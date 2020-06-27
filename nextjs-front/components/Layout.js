import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Router.onRouteChangeStart = (url) => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const Layout = (props) => {
    const head = () => (
        <React.Fragment>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
            <link rel="stylesheet" href="/static/css/styles.css" />
        </React.Fragment>
    )


    const nav = () => (
        <React.Fragment>
            <ul className="nav nav-tabs bg-warning">
                <li className="nav-item">
                    <Link href="/">
                        <a className="nav-link text-dark">Home</a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="/login">
                        <a className="nav-link text-dark" >Login</a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="/register">
                        <a className="nav-link text-dark">Register</a>
                    </Link>
                </li>
            </ul>
        </React.Fragment>
    )

    return <React.Fragment>
        {head()}  {nav()}  <div className="container-fluid pt-5 pb-5">{props.children}</div>
    </React.Fragment>
}

export default Layout