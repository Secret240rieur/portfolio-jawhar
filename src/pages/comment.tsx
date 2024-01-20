import { FieldHookConfig, useField } from "formik";

export const CustomCommentBox = (props: {
  name: any | FieldHookConfig<any> | undefined;
}) => {
  const [field, meta, helpers] = useField(props.name);
  return (
    <textarea
      {...field}
      name={props.name}
      value={field.value}
      cols={36}
      rows={5}
      placeholder="Your message here..."
    />
  );
};
