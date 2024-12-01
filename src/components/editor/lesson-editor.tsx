import { Editor } from "@tinymce/tinymce-react";

interface LessonEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

const LessonEditor = ({ value = "", onChange }: LessonEditorProps) => {
  return (
    <>
      <Editor
        apiKey="2l1llxzlsrh3zb31k10ed0lns0u8krfruzrboy6apcqhwyhg"
        onEditorChange={onChange}
        value={value}
        init={{
          placeholder: "Typing something...",
          height: "calc(100vh - 160px)",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | link image media | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </>
  );
};

export default LessonEditor;
