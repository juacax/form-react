import { useForm } from "react-hook-form";
import { validatedAge } from "./Validate";

const Form = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  const includePhone = watch("includePhone");

  return (
    <>
      <h2>Form React</h2>
      <form className="form-react" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label>Name</label>
          <input
            type="text"
            placeholder="Facundo Guardia"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && <p className="fail">Required</p>}
        </div>

        <div className="form-control">
          <label>Email</label>
          <input
            type="text"
            placeholder="example@email.com"
            {...register("email", {
              required: true,
              pattern:
                /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
            })}
          />
          {errors.email?.type === "required" && (
            <p className="fail">Required</p>
          )}
          {errors.email?.type === "pattern" && (
            <p className="fail">The email format is incorrect</p>
          )}
        </div>

        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            placeholder="********"
            {...register("password", { required: true, maxLength: 8 })}
          />
        </div>
        {errors.password?.type === "required" && (
          <p className="fail">Required</p>
        )}
        {errors.password?.type === "maxLength" && (
          <p className="fail">The password is a maximum of 8 characters</p>
        )}

        <div className="form-control">
          <label>Age</label>
          <input
            type="number"
            placeholder="18"
            {...register("age", { validate: validatedAge })}
          />
          {errors.age && <p className="fail">you are underage</p>}
        </div>

        <div className="form-control">
          <label>Message</label>
          <textarea
            cols="55"
            rows="10"
            placeholder="Some Text"
            {...register("message")}
          ></textarea>
        </div>

        <div className="form-control-cheackbox">
          <label>¿Include Phone?</label>
          <input type="checkbox" {...register("includePhone")} />
        </div>
        {includePhone && (
          <div className="form-control">
            <label>Phone</label>
            <input type="text" placeholder="+549 11 545336" {...register("phono")} />
          </div>
        )}

        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default Form;
