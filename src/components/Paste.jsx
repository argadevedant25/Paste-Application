import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [showShareModal, setShowShareModal] = useState(false); // State to manage modal visibility
  const [selectedPaste, setSelectedPaste] = useState(null); // State to track selected paste for sharing

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleShare(paste) {
    setSelectedPaste(paste); // Set the paste to be shared
    setShowShareModal(true); // Show the share modal
  }

  function handleRedirectToShare(platform) {
    if (!selectedPaste) return;

    const title = encodeURIComponent(selectedPaste.title);
    const content = encodeURIComponent(selectedPaste.content);

    let url = '';

    switch (platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=Title:%20${title}%0AContent:%20${content}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
        break;
      case 'gmail':
        url = `mailto:?subject=${title}&body=${content}`;
        break;
      default:
        break;
    }

    window.open(url, '_blank', 'noopener noreferrer');
    setShowShareModal(false); // Close the modal after redirecting
    setSelectedPaste(null); // Reset the selected paste
  }

  return (
    <div>
      <input
        className="p-2 rounded 2xl min-w-[600px] mt-5"
        type="search"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className="border p-4 rounded" key={paste?._id}>
                <div>{paste.content}</div>
                <div className="flex flex-row gap-4 place-content-evenly">
                  <button>
                    <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                  </button>
                  <button>
                    <a href={`/pastes/${paste?._id}`}>View</a>
                  </button>
                  <button onClick={() => handleDelete(paste?._id)}>Delete</button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success('Copied to the Clipboard');
                    }}
                  >
                    Copy
                  </button>
                  <button onClick={() => handleShare(paste)}>Share</button>
                </div>
                <div>{paste.createdAt}</div>
              </div>
            );
          })}
      </div>

      {/* Share Modal */}
      {showShareModal && selectedPaste && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold text-center mb-4">Choose a platform to share:</h3>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleRedirectToShare('whatsapp')}
                className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-all ease-in-out duration-200"
              >
                Share on WhatsApp
              </button>
              <button
                onClick={() => handleRedirectToShare('facebook')}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-all ease-in-out duration-200"
              >
                Share on Facebook
              </button>
              <button
                onClick={() => handleRedirectToShare('gmail')}
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-all ease-in-out duration-200"
              >
                Share via Gmail
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-all ease-in-out duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Paste;