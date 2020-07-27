import Layout from '../components/Layout'
import axios from 'axios'
import Link from 'next/link'
import { API } from '../config'

const Home = ({ categories }) => {
    const listCategories = () => categories.map((c, i) => (
        <Link href="/">
            <a style={{ border: '1px solid red' }} className="bl-light p-3 col-md-4">
                <div>
                    <div className="row">
                        <div className="col-md-4">
                            <img src={c.image && c.image.url} alt={c.name} style={{width: '100px', height: 'auto'}} className="pr-3"/>
                         </div>
                        <div className="col-md-8"> <h3>{c.name}</h3> </div>
                    </div>
                </div>
            </a>
        </Link>
    ))
    return (<Layout>
        <div className="row">
            <div className="col-md-12">
                <h1 className="font-weight-bold">Browser Tutorials/Courses</h1>
                <br></br>
            </div>
        </div>
        <div className="row">
            {listCategories()}
        </div>
    </Layout>)
}

Home.getInitialProps = async () => {
    const response = await axios.get(`${API}/categories`)
    return {
        categories: response.data
    }
}

export default Home;