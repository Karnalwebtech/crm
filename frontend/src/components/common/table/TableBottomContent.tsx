import { Pagination } from '@nextui-org/react';
import React from 'react';

interface Props {
  page: number;
  pages: number;
  setPage: (value: number) => void;
}

const TableBottomContent: React.FC<Props> = ({ page, pages, setPage }) => {

  return (
    <div className="py-2 px-2 flex justify-between items-center">
      {
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              initialPage={1}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
    </div>
  );
};

export default TableBottomContent;
