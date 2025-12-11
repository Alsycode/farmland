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
  const [existingImages, setExistingImages] = useState([]); // images already on server
  const [newImages, setNewImages] = useState([]); // File objects
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
    // reset file input
    fileRef.current.value = '';
  }

  function removeNewImageAt(idx) {
    setNewImages((s) => s.filter((_, i) => i !== idx));
  }

  function removeExistingImageAt(idx) {
    setExistingImages((s) => s.filter((_, i) => i !== idx));
    // Note: this only removes from UI; actual deletion requires calling property image delete route:
    // DELETE /api/properties/:id/images/:filename
    // We'll call that when saving if required (but backend supports direct DELETE endpoint).
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

      // append new images
      newImages.forEach((file) => fd.append('images', file));

      // send location fields, metadata etc as needed
      let res;
      if (isEdit) {
        res = await propertyService.update(id, fd);
      } else {
        res = await propertyService.create(fd);
      }

      if (res.ok) {
        // navigate to detail page for created/updated property
        const propId = res.property?._id || (res.property && res.property._id) || (isEdit ? id : null);
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

  return (
    <div>
      <h2 className="text-2xl mb-4">{isEdit ? 'Edit Property' : 'Create Property'}</h2>

      <form onSubmit={submit} className="bg-white p-4 rounded shadow space-y-4">
        <div>
          <label className="text-sm block mb-1">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded px-3 py-2" required />
        </div>

        <div>
          <label className="text-sm block mb-1">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded px-3 py-2" rows={6} required />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm block mb-1">Price (INR)</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border rounded px-3 py-2" type="number" required />
          </div>
          <div>
            <label className="text-sm block mb-1">Area</label>
            <input value={area} onChange={(e) => setArea(e.target.value)} className="w-full border rounded px-3 py-2" type="number" />
          </div>
          <div>
            <label className="text-sm block mb-1">Unit</label>
            <input value={unit} onChange={(e) => setUnit(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
        </div>

        <div>
          <label className="text-sm block mb-1">Address</label>
          <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm block mb-1">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border rounded px-3 py-2">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div>
            <label className="text-sm block mb-1">Tags (comma separated)</label>
            <input value={tags} onChange={(e) => setTags(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="text-sm block mb-1">Amenities (comma separated)</label>
            <input value={amenities} onChange={(e) => setAmenities(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
        </div>

        <div>
          <label className="text-sm block mb-1">Existing images</label>
          {existingImages.length ? (
            <ImagePreviewList images={existingImages} onRemove={removeExistingImageAt} />
          ) : (
            <div className="text-gray-500">No existing images</div>
          )}
        </div>

        <div>
          <label className="text-sm block mb-1">Add images</label>
          <input ref={fileRef} type="file" accept="image/*" multiple onChange={onSelectFiles} className="block" />
          {newImages.length > 0 && (
            <>
              <div className="mt-2 text-sm text-gray-600">New images (will be uploaded on save)</div>
              <ImagePreviewList images={newImages} onRemove={removeNewImageAt} />
            </>
          )}
        </div>

        {error && <div className="text-red-600">{error}</div>}

        <div className="flex gap-2">
          <button disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded">{loading ? 'Saving…' : 'Save'}</button>
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-100 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
