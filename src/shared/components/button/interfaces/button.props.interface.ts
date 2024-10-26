export interface IButtonProps {
  children: string | JSX.Element;
  className?: string;
  border?: boolean;
  onClick?: () => void;
}
