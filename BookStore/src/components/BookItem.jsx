import React from 'react'
import { useNavigate } from 'react-router-dom'

const BookItem = ({ bookData }) => {
  const navigate = useNavigate()

  const handleOnView = (id) => {
    navigate(`/book/${id}`)
  }

  return (
    <div className="col-sm-4 col-md-3">
      <div className="card mb-4 box-shadow">
        <img
          className="card-img-top mx-auto mt-2" 
          data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
          alt="Thumbnail [100%x225]"
          style={{ height: "255px", width: "70%", display: "block" }} 
          src={bookData.bookCover}
          data-holder-rendered="true"
        />
        <div className="card-body">
          <h3>{bookData.bookName}</h3>
          <p className="card-text">
            {bookData.displayContent}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => handleOnView(bookData.id)}
              >
                View
              </button>
            </div>
            <small className="text-muted">{bookData.publishedYear}</small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookItem
