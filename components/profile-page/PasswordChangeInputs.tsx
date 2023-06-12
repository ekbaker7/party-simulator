interface Props {
  inputs: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function PasswordChangeInputs({ inputs, handleChangeInput }: Props) {
  return (
    <div>
      <div className="my-3 flex justify-between text-sm">
        <input
          type="password"
          className="border rounded p-2 py-3 w-full"
          placeholder="Current Password"
          value={inputs.oldPassword}
          onChange={handleChangeInput}
          name="oldPassword"
        />
      </div>
      <div className="my-3 flex justify-between text-sm">
        <input
          type="password"
          className="border rounded p-2 py-3 w-full"
          placeholder="New Password"
          value={inputs.newPassword}
          onChange={handleChangeInput}
          name="newPassword"
        />
      </div>
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
    </div>
  );
}

export default PasswordChangeInputs;
