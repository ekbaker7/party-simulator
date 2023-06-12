interface Props {
  inputs: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  isSignIn: boolean;
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function LoginModalInputs({ inputs, isSignIn, handleChangeInput }: Props) {
  return (
    <div>
      <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          className="border rounded p-2 py-3 w-full"
          placeholder="Username"
          value={inputs.username}
          onChange={handleChangeInput}
          name="username"
        />
      </div>
      {!isSignIn && (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="text"
            className="border rounded p-2 py-3 w-full"
            placeholder="Email"
            value={inputs.email}
            onChange={handleChangeInput}
            name="email"
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="password"
          className="border rounded p-2 py-3 w-full"
          placeholder="Password"
          value={inputs.password}
          onChange={handleChangeInput}
          name="password"
        />
      </div>
      {!isSignIn && (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="password"
            className="border rounded p-2 py-3 w-full"
            placeholder="Confirm Password"
            value={inputs.confirmPassword}
            onChange={handleChangeInput}
            name="confirmPassword"
          />
        </div>
      )}
    </div>
  );
}

export default LoginModalInputs;
