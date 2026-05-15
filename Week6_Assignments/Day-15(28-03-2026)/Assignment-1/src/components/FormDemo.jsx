import { useForm } from 'react-hook-form'

export default function FormDemo() {
  const oNFormSubmit = (obj) => {
    console.log(obj)
  }

  const {
    register, //to register form fields
    handleSubmit, //to handle form submissions
    formState: { errors } //to handle errors
  } = useForm()

  return (
    <div>
      <h1 className="text-5xl text-center">Form Demo</h1>
      {/* form */}
      <form
        className="max-w-md mx-auto mt-10"
        onSubmit={handleSubmit(oNFormSubmit)}
      >
        {/* username */}
        <div className="mb-3">
          <label htmlFor="Username">Username</label>
          <input
            type="text"
            {...register('Username', {
              required: 'Username required',
              validate: (v) =>
                v.trim().length !== 0 || 'White space is not valid',
              // minLength: 4,
              // maxLength: 6
            })}
            id="Username"
            className="border w-full p-3"
          />
          {errors.Username?.type === 'required' && (
            <p className="text-red-500 ">{errors.Username.message}</p>
          )}
          {errors.Username?.type === 'validate' && (
            <p className="text-red-500 ">{errors.Username.message}</p>
          )}
          {errors.Username?.type === 'minLength' && (
            <p className="text-red-500 ">Min length of Username is 4</p>
          )}
          {errors.Username?.type === 'maxLength' && (
            <p className="text-red-500 ">Max length of Username is 6</p>
          )}
        </div>
        {/* email */}
        <div className="mb-3">
          <label htmlFor="Username">Email</label>
          <input
            type="email"
            {...register('email')}
            id="email"
            className="border w-full p-3"
          />
        </div>
        <button type="submit" className="p-3 bg-amber-500 block mx-auto">
          Submit
        </button>
      </form>
    </div>
  )
}
