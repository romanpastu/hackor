import Layout from '../../components/Layout'
import axios from 'axios'


const User = ({todos}) => <Layout>{JSON.stringify(todos)}</Layout>

User.getInitialProps = async() => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
    console.log('SERVER RENDERED', response)
    return {
        todos: response.data
    }
}


export default User;