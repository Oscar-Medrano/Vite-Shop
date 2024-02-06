import { useContext, useState, useRef } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ShoppingCartContext } from '../../Context'
import Layout from '../../Components/Layout'

function SignIn() {
  const context = useContext(ShoppingCartContext)
  const [ view, setView ] = useState('user-info')
  const form = useRef(null)

  //Account
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)

  //HAS AN ACCOUNT OR NOT?
  const hasValidAccount = account => {
    return account && account.name && account.email && account.password;
  }

  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
  const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true;
  const hasUserAnAccount = (hasValidAccount(parsedAccount) && !noAccountInLocalStorage) || (hasValidAccount(context.account) && !noAccountInLocalState);

  const handleSignIn = () => {
    const stringifiedSignOut = JSON.stringify(false)
    localStorage.setItem('sign-out', stringifiedSignOut)
    context.setSignOut(false)
    //Redirect
    return <Navigate replace to={'/'}/>
  }

  const createAnAccount = ()=>{
    const formData = new FormData(form.current)
    const data={
      name:formData.get('name'),
      email:formData.get('email'),
      password:formData.get('password'),
    }
    //Create Account
    const stringifiedAccount = JSON.stringify(data)
    localStorage.setItem('account', stringifiedAccount)
    context.setAccount(data)
    //SignIn
    handleSignIn()
  }

  const renderLogIn = () => {
    return(
      <div className='flex flex-col w-80'>
          <p>
            <span className='font-light text-sm'>Email: </span>
            <span>{parsedAccount?.email}</span>
          </p>
          <p>
            <span className='font-light text-sm'>Password: </span>
            <span>{parsedAccount?.password}</span>
          </p>

          <Link to='/'>
            <button 
            className='bg-blue-500 disabled:bg-blue-500/70 text-white w-full rounded-lg'
            disabled = {!hasUserAnAccount}
            onClick = {() => handleSignIn()}>
              Log In
            </button>
          </Link>
        <div className= 'text-center'>
          <a className='font-light text-xs underline underline-offset-4'>Forgot my password</a>
        </div>
        <button 
          className='border border-blue-600 disabled:border-blue-600/70 disabled:text-black/40 w-full rounded-lg mt-6 py-3'
          disabled = {hasUserAnAccount}
          onClick = {() => setView('create-user-info')}>
            Sign Up
        </button>
      </div>
    )
  }

  const renderCreateUserInfo = () => {
    return(
      <form ref={form} className = 'flex flex-col gap-4 w-80'>
        <div className='flex flex-col gap-1'>
          <label htmlFor="name" className='font-light text-sm'>Your name: </label>
          <input 
          type="text"
          id='name'
          name='name'
          defaultValue={parsedAccount?.name} 
          placeholder='Your name' 
          className='rounded-lg border border-black placeholder:font-light placeholder:text-md placeholder:text-black/60 focus:outline-none py-2 px-4' />
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor="email" className='font-light text-sm'>Your email: </label>
          <input 
          type="text"
          id='email'
          name='email'
          defaultValue={parsedAccount?.email} 
          placeholder='helloworld@example.com' 
          className='rounded-lg border border-black placeholder:font-light placeholder:text-md placeholder:text-black/60 focus:outline-none py-2 px-4' />
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor="password" className='font-light text-sm'>Your password: </label>
          <input 
          type="text"
          id='password'
          name='password'
          defaultValue={parsedAccount?.password} 
          placeholder='*********' 
          className='rounded-lg border border-black placeholder:font-light placeholder:text-md placeholder:text-black/60 focus:outline-none py-2 px-4' />
        </div>
        
        <Link
        to='/'>
        <button
        className='bg-blue-500 text-white w-full rounded-lg py-3'
        onClick={()=>createAnAccount()}>
          Create.
        </button>
        </Link>
      </form>
    )
  }

  const renderView = () => view === 'create-user-info' ? renderCreateUserInfo() : renderLogIn()
    return (
      <Layout>
        <h1 className="font-medium text-xl text-center mb-6 w-80">Welcome to Vite-Shop</h1>
        {renderView()}
    </Layout>
  )
}

export default SignIn