type OptionStyle = 'switch' | 'dropdown' | 'slider' | 'button';
type OptionCallback = (event: any) => void;
export type OptionValue = string | number | boolean;

export interface Option {
  label: string;
  style: OptionStyle;
  content?: string[];
  callback?: OptionCallback; // NECESSARY
}

export interface Section {
  title: string;
  options: Option[];
}
