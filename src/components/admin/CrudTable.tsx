"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, AlertCircle, RefreshCw, ExternalLink, Image as ImageIcon, Upload, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LONG_FIELDS = ["description", "bio", "overview", "message", "content"];
const ARRAY_FIELDS = ["tags", "roles"];
const IMAGE_FIELDS = ["image", "icon", "profileImage", "logo", "thumbnail"];

export default function CrudTable({ 
  modelName, 
  fields, 
  requiredFields = [] 
}: { 
  modelName: string; 
  fields: string[]; 
  requiredFields?: string[];
}) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [modelName]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/portfolio/${modelName}`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const d = await res.json();
      if (!Array.isArray(d)) throw new Error("Unexpected response. Is MongoDB connected?");
      setData(d);
    } catch (err: any) {
      setError(err.message || "Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/portfolio/${modelName}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete.");
      setData(data.filter((item) => item._id !== id));
    } catch {
      alert("Failed to delete. Check your connection.");
    } finally {
      setDeletingId(null);
    }
  };

  const openAdd = () => {
    setFormData({});
    setEditingId(null);
    setFormError(null);
    setShowModal(true);
  };

  const [formError, setFormError] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    const missing = requiredFields.filter(f => !formData[f] || (Array.isArray(formData[f]) && formData[f].length === 0));
    if (missing.length > 0) {
      setFormError(`Please fill in the following required fields: ${missing.join(", ")}`);
      setSaving(false);
      return;
    }

    setSaving(true);
    setFormError(null);
    try {
      // Convert comma-separated strings back to arrays for array fields
      const payload: any = { ...formData };
      ARRAY_FIELDS.forEach((f) => {
        if (typeof payload[f] === "string") {
          payload[f] = payload[f]
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean);
        }
      });

      const url = editingId
        ? `/api/portfolio/${modelName}/${editingId}`
        : `/api/portfolio/${modelName}`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to save.");
      }
      setShowModal(false);
      setFormData({});
      setEditingId(null);
      fetchData();
    } catch (err: any) {
      setFormError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(field);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });
      const data = await res.json();
      if (data.url) {
        setFormData({ ...formData, [field]: data.url });
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploadingField(null);
    }
  };

  const openEdit = (item: any) => {
    const fd: any = {};
    fields.forEach((f) => {
      fd[f] = Array.isArray(item[f]) ? item[f].join(", ") : item[f] || "";
    });
    setFormData(fd);
    setEditingId(item._id);
    setFormError(null);
    setShowModal(true);
  };

  if (loading)
    return (
      <div className="p-8 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-14 bg-gray-100 animate-pulse rounded-xl" />
        ))}
      </div>
    );

  if (error)
    return (
      <div className="p-8">
        <div className="flex items-start gap-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6">
          <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-lg mb-1">Cannot connect to database</p>
            <p className="text-sm mb-4">{error}</p>
            <div className="bg-white rounded-xl border border-red-200 p-4 text-sm space-y-2 mb-4">
              <p className="font-semibold text-red-800">
                Update your <code className="bg-red-100 px-1 rounded">.env.local</code> with a real MongoDB URI:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-red-700">
                <li>
                  Go to{" "}
                  <a href="https://cloud.mongodb.com" target="_blank" className="underline font-medium">
                    cloud.mongodb.com
                  </a>{" "}
                  → Sign up free
                </li>
                <li>Create a cluster → Connect → Drivers</li>
                <li>Copy the string into your <code className="bg-red-100 px-1 rounded">.env.local</code></li>
                <li>Restart the dev server</li>
              </ol>
            </div>
            <button
              onClick={fetchData}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
            >
              <RefreshCw className="w-4 h-4" /> Retry
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold capitalize text-gray-900">{modelName} Management</h1>
          <p className="text-sm text-gray-400 mt-0.5">{data.length} record{data.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          id={`add-${modelName.toLowerCase()}-btn`}
          onClick={openAdd}
          className="bg-gray-900 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-gray-700 transition-colors text-sm font-medium shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {data.length === 0 ? (
          <div className="py-20 text-center text-gray-400">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-lg font-medium mb-1">No {modelName} entries yet</p>
            <p className="text-sm">Click "Add New" to create your first entry.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  {fields.slice(0, 3).map((field) => (
                    <th key={field} className="px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider capitalize">
                      {field}
                    </th>
                  ))}
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                    {fields.slice(0, 3).map((field) => {
                      const isImage = IMAGE_FIELDS.includes(field);
                      const val = item[field];
                      
                      return (
                        <td
                          key={field}
                          className="px-5 py-4 text-sm text-gray-700 max-w-[220px] truncate"
                          title={Array.isArray(val) ? val.join(", ") : val?.toString()}
                        >
                          {isImage && val ? (
                            <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
                              <img 
                                src={val} 
                                alt="" 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as any).src = "https://via.placeholder.com/40?text=?";
                                }}
                              />
                            </div>
                          ) : (
                            Array.isArray(val)
                              ? val.join(", ")
                              : val?.toString() || ""
                          )}
                        </td>
                      );
                    })}
                    <td className="px-5 py-4">
                      <div className="flex gap-1">
                        <button
                          onClick={() => openEdit(item)}
                          className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          disabled={deletingId === item._id}
                          className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors disabled:opacity-40"
                          title="Delete"
                        >
                          {deletingId === item._id ? (
                            <div className="w-4 h-4 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">
                  {editingId ? "Edit" : "Add New"} {modelName}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:bg-gray-100 p-2 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-4">
                {formError && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-start gap-2.5 border border-red-100">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Unable to save</p>
                      <p className="opacity-90">{formError}</p>
                    </div>
                  </div>
                )}
                
                {fields.map((field) => {
                  const isLong = LONG_FIELDS.includes(field);
                  const isArray = ARRAY_FIELDS.includes(field);
                  return (
                    <div key={field}>
                      <label className="block text-sm font-semibold text-gray-700 capitalize mb-1.5">
                        {field}
                        {requiredFields.includes(field) && <span className="text-red-500 ml-1">*</span>}
                        {isArray && (
                          <span className="ml-2 text-xs font-normal text-gray-400">
                            (comma-separated)
                          </span>
                        )}
                      </label>
                      {isLong ? (
                        <textarea
                          rows={4}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:outline-none transition-all text-sm resize-none"
                          value={formData[field] || ""}
                          onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                          placeholder={`Enter ${field}...`}
                        />
                      ) : IMAGE_FIELDS.includes(field) ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-4">
                            <div className="relative group w-20 h-20 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition-all hover:border-blue-400">
                              {formData[field] ? (
                                <img 
                                  src={formData[field]} 
                                  className="w-full h-full object-cover" 
                                  alt="Preview" 
                                />
                              ) : (
                                <Camera className="w-6 h-6 text-gray-300 group-hover:text-blue-400 transition-colors" />
                              )}
                              {uploadingField === field && (
                                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-2">
                                <label className="cursor-pointer bg-white border border-gray-200 px-4 py-2 rounded-xl text-xs font-semibold hover:border-gray-900 transition-colors shadow-sm flex items-center gap-2">
                                  <Upload className="w-3.5 h-3.5" />
                                  {formData[field] ? "Replace Image" : "Upload Image"}
                                  <input 
                                    type="file" 
                                    className="hidden" 
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, field)}
                                  />
                                </label>
                                {formData[field] && (
                                  <button 
                                    type="button"
                                    onClick={() => setFormData({ ...formData, [field]: "" })}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                              <p className="text-[10px] text-gray-400">SVG, PNG, JPG (max. 5MB)</p>
                            </div>
                          </div>
                          {/* Fallback to text input for manual URL */}
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-100 rounded-lg focus:outline-none bg-gray-50/50 text-[11px] text-gray-400 placeholder:text-gray-300"
                            value={formData[field] || ""}
                            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                            placeholder="Or paste external URL..."
                          />
                        </div>
                      ) : (
                        <div className="relative">
                          <input
                            type="text"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:outline-none transition-all text-sm"
                            value={formData[field] || ""}
                            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                            placeholder={`Enter ${field}...`}
                          />
                          {(field === "link" || field === "liveLink" || field === "githubLink" || field === "resumeLink") && formData[field] && (
                            <a href={formData[field]} target="_blank" rel="noopener noreferrer" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    id="crud-save-btn"
                    className="px-5 py-2.5 bg-gray-900 text-white hover:bg-gray-700 rounded-xl transition-colors text-sm font-medium disabled:opacity-50 flex items-center gap-2"
                  >
                    {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
