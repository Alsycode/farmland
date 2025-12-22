// path: src/pages/PropertyForm.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import propertyService from '../services/propertyService';
import ImagePreviewList from '../components/ImagePreviewList';

export default function PropertyForm() {
  const { id } = useParams(); // if present -> edit mode
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [area, setArea] = useState('');
  const [unit, setUnit] = useState('acre');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('draft');
  const [tags, setTags] = useState('');
  const [amenities, setAmenities] = useState('');
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const fileRef = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function load() {
    setLoading(true);
    try {
      const res = await propertyService.get(id);
      if (res.ok) {
        const p = res.property;
        setTitle(p.title || '');
        setDescription(p.description || '');
        setPrice(p.price || '');
        setArea(p.area || '');
        setUnit(p.unit || 'acre');
        setAddress(p.address || '');
        setStatus(p.status || 'draft');
        setTags((p.tags || []).join(','));
        setAmenities((p.amenities || []).join(','));
        setExistingImages(p.images || []);
      } else {
        setError(res.error || 'Failed to load property');
      }
    } catch (err) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  function onSelectFiles(e) {
    const files = Array.from(e.target.files || []);
    setNewImages((s) => [...s, ...files]);
    fileRef.current.value = '';
  }

  function removeNewImageAt(idx) {
    setNewImages((s) => s.filter((_, i) => i !== idx));
  }

  function removeExistingImageAt(idx) {
    setExistingImages((s) => s.filter((_, i) => i !== idx));
  }

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const fd = new FormData();
      fd.append('title', title);
      fd.append('description', description);
      fd.append('price', price);
      fd.append('area', area);
      fd.append('unit', unit);
      fd.append('address', address);
      fd.append('status', status);
      fd.append('tags', tags);
      fd.append('amenities', amenities);
      newImages.forEach((file) => fd.append('images', file));

      const res = isEdit
        ? await propertyService.update(id, fd)
        : await propertyService.create(fd);

      if (res.ok) {
        const propId = res.property?._id || (isEdit ? id : null);
        navigate(propId ? `/properties/${propId}` : '/properties');
      } else {
        setError(res.error || 'Save failed');
      }
    } catch (err) {
      setError(err?.response?.data?.error || err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  /* ================= neumorphism helpers ================= */

  const card =
    "bg-[#1e2229] rounded-2xl p-6 " +
    "shadow-[6px_6px_12px_#14161a,-6px_-6px_12px_#242a32]";

  const inset =
    "bg-[#1e2229] rounded-xl px-4 py-3 text-gray-200 " +
    "shadow-[inset_4px_4px_8px_#14161a,inset_-4px_-4px_8px_#242a32] " +
    "focus:outline-none";

  const label = "text-xs text-gray-400 mb-1 block";

  const actionBtn =
    "px-4 py-2 rounded-xl text-sm font-medium transition " +
    "shadow-[4px_4px_8px_#14161a,-4px_-4px_8px_#242a32] " +
    "active:shadow-[inset_4px_4px_8px_#14161a,inset_-4px_-4px_8px_#242a32]";

  return (
    <div className="text-gray-200 space-y-6">
      <h2 className="text-2xl font-semibold">
        {isEdit ? 'Edit Property' : 'Create Property'}
      </h2>

      <form onSubmit={submit} className={card + " space-y-6"}>
        {/* Title */}
        <div>
          <label className={label}>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inset + " w-full"}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className={label}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            className={inset + " w-full resize-none"}
            required
          />
        </div>

        {/* Price / Area / Unit */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={label}>Price (INR)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={inset + " w-full"}
              required
            />
          </div>
          <div>
            <label className={label}>Area</label>
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className={inset + " w-full"}
            />
          </div>
          <div>
            <label className={label}>Unit</label>
            <input
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className={inset + " w-full"}
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className={label}>Address</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={inset + " w-full"}
          />
        </div>

        {/* Status / Tags / Amenities */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={label}>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={inset + " w-full"}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div>
            <label className={label}>Tags</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className={inset + " w-full"}
            />
          </div>
          <div>
            <label className={label}>Amenities</label>
            <input
              value={amenities}
              onChange={(e) => setAmenities(e.target.value)}
              className={inset + " w-full"}
            />
          </div>
        </div>

        {/* Existing images */}
        <div>
          <label className={label}>Existing images</label>
          {existingImages.length ? (
            <ImagePreviewList images={existingImages} onRemove={removeExistingImageAt} />
          ) : (
            <div className="text-gray-500 text-sm">No existing images</div>
          )}
        </div>

        {/* New images */}
        <div>
          <label className={label}>Add images</label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            onChange={onSelectFiles}
            className="text-sm text-gray-400"
          />
          {newImages.length > 0 && (
            <div className="mt-3">
              <div className="text-xs text-gray-400 mb-2">
                New images (uploaded on save)
              </div>
              <ImagePreviewList images={newImages} onRemove={removeNewImageAt} />
            </div>
          )}
        </div>

        {error && <div className="text-red-400 text-sm">{error}</div>}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            disabled={loading}
            className={actionBtn + " text-indigo-400"}
          >
            {loading ? 'Saving…' : 'Save'}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={actionBtn + " text-gray-300"}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
