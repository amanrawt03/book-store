import React from 'react'
import { Link } from 'react-router-dom'
const SuggestedBook = ({bookData}) => {
  return (
    <li>
                    <Link to={`/book/${bookData.id}`}
                      className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top"
                      href="#"
                    >
                      <img src={bookData.bookCover} style={{width:"100px"}}/>
                      <div className="col-lg-8">
                        <h6 className="mb-0">
                          {bookData.bookName}
                        </h6>
                        <small className="text-body-secondary">
                          {bookData.author}
                        </small>
                      </div>
                    </Link>
                  </li>
  )
}

export default SuggestedBook
