// Contentful interfaces - this only includes properties
//  used in tests but more are available. Extend these interfaces
//  as needed
interface ContentfulModel {
  sys_id: string;
  isPublished: boolean;
}

interface TextFieldModel {
  text: string;
}

interface Message extends ContentfulModel {
  slug: TextFieldModel;
  title: TextFieldModel;
}

interface Series extends ContentfulModel {
  slug: TextFieldModel; // TODO create types for these too
}

interface ContentBlock extends ContentfulModel {
  content: TextFieldModel;
}
