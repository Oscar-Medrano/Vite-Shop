import { Link } from 'react-router-dom'
import Layout from '../../Components/Layout'

function SignIn() {
    return (
      <Layout>
        <h1 className="font-medium text-xl text-center mb-6 w-80">Welcome</h1>
        <div className='flex flex-col w-80'>
          <p>
            <span className='font-light text-sm'>Email: </span>
            <span>oscar@example.com</span>
          </p>
          <p>
            <span className='font-light text-sm'>Password: </span>
            <span>*******</span>
          </p>

          <Link to='/'>
            <button className='bg-blue-500 disabled:bg-blue-500/70 text-white w-full rounded-lg'>
              Log In
            </button>
          </Link>
        <div className= 'text-center'>
          <a className='font-light text-xs underline underline-offset-4'>Forgot my password</a>
        </div>
        <button 
          className='border border-blue-600 disabled:border-blue-600/70 disabled:text-black/40 w-full rounded-lg mt-6 py-3'>
            Sign Up
        </button>
      </div>
    </Layout>
  )
}

export default SignIn