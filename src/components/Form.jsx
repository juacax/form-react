import { useForm } from "react-hook-form";
import { validatedAge } from "./Validate";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import { useEffect } from "react";
import { useState } from "react";

const Form = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    reset();
  };

  const includePhone = watch("includePhone");

  const [isOpenModal, openModal, closeModal] = useModal(false);

  const [email, setEmail] = useState("");

  const cambiarEmail = (e) => {
    setEmail(e.target.value);
  }

  return (
    <>
      <h2>Form React</h2>
      <form className="form-react" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            autoComplete="off"
            name="name"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && <p className="fail">Required</p>}
        </div>

        <div className="form-control">
          <label>Email</label>
          <input
            type="text"
            onChange={cambiarEmail}
            placeholder="Enter your email"
            autoComplete="off"
            {...register("email", {
              required: true,
              pattern: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
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
            placeholder="Enter your password"
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
            placeholder="Enter your age"
            {...register("age", { validate: validatedAge })}
          />
          {errors.age && <p className="fail">you are underage</p>}
        </div>

        <div className="form-control">
          <label>Message</label>
          <textarea
            cols="55"
            rows="10"
            placeholder="Enter your message"
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
            <input
              type="text"
              placeholder="Enter your phone"
              autoComplete="off"
              {...register("phone")}
            />
          </div>
        )}

        <button className="modal-btn" type="submit" onClick={openModal}>
          Send
        </button>
        <Modal isOpen={isOpenModal} closeModal={closeModal}>
          <h2 className="modal-title">Form Data</h2>
          <div className="modal-items">
          </div>
        </Modal>
      </form>
    </>
  );
};

export default Form;
