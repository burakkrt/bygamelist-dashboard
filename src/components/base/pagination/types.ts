export interface IPaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: React.Dispatch<React.SetStateAction<number>>
}
