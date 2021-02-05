import React from "react";
import TextInput from "./TextInput";

function DynamicForm({ formData, handleSubmit }) {
  const initialValue = Object.keys(formData).reduce(
    (prevSection, curSection) => ({
      ...prevSection,
      [curSection]: formData[curSection]
        .map(({ id }) => id)
        .reduce(
          (pv, cv) => ({
            ...pv,
            [cv]: "",
          }),
          {}
        ),
    }),
    {}
  );
  const [values, setValues] = React.useState(initialValue);
  console.log(values);
  return (
    <form onSubmit={() => handleSubmit(values)}>
      {Object.keys(formData).map((key) => (
        <section key={key}>
          <h2>{key}</h2>
          {formData[key].map((formInput) => (
            <TextInput
              key={formInput.id}
              {...formInput}
              visible={
                !!formInput.dependencies
                  ? formInput.dependencies &&
                    Object.keys(formInput.dependencies)
                      .map((depKey) => {
                        if (
                          typeof formInput.dependencies[depKey] === "function"
                        ) {
                          return formInput.dependencies[depKey](
                            values[key][depKey]
                          );
                        }
                        return (
                          formInput.dependencies[depKey] === values[key][depKey]
                        );
                      })
                      .reduce((pv, cv) => pv && cv, true)
                  : true
              }
              value={values[key][formInput.id]}
              setValue={(value) =>
                setValues({
                  ...values,
                  [key]: {
                    ...values[key],
                    [formInput.id]: value,
                  },
                })
              }
            />
          ))}
        </section>
      ))}
    </form>
  );
}

export default DynamicForm;
