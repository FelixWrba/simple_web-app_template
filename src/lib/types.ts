type OptionStyle = 'switch' | 'dropdown';

interface Option {
  label: string;
  style: OptionStyle;
  content?: string[];
}

export interface Section {
  title: string;
  options: Option[];
}
