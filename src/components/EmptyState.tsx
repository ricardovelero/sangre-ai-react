import { Button } from "./ui/button";

interface EmptyStateProps {
  message?: string;
  icon?: React.ReactNode;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

export default function EmptyState({
  message = "No hay datos disponibles",
  icon,
  buttonLabel,
  onButtonClick,
}: EmptyStateProps) {
  return (
    <div className='text-center py-10'>
      {icon && <div className='mb-3 flex justify-center'>{icon}</div>}
      <p className='text-gray-500 mb-3'>{message}</p>
      {buttonLabel && onButtonClick && (
        <Button onClick={onButtonClick}>{buttonLabel}</Button>
      )}
    </div>
  );
}
