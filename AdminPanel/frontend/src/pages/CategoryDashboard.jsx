import React, { useEffect, useState } from "react";
import api from "../../axios";
import Input from "../components/input";
import Button from "../components/Button";
import { Card, CardContent } from "../components/Card";

const CategoryDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [parents, setParents] = useState([]);
  const [form, setForm] = useState({ name: "", parentId: "" });
  const [parentForm, setParentForm] = useState({ name: "", slug: "" });

  const fetchAll = async () => {
    const [catRes, parentRes] = await Promise.all([
      api.get("/api/categories"),
      api.get("/api/category-parents"),
    ]);
    setCategories(catRes.data.categories);
    setParents(parentRes.data.parents);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleCreateCategory = async () => {
    await api.post("/api/categories", form);
    setForm({ name: "", parentId: "" });
    fetchAll();
  };

  const handleCreateParent = async () => {
    await api.post("/api/category-parents", parentForm);
    setParentForm({ name: "", slug: "" });
    fetchAll();
  };

  const deleteItem = async (id, type) => {
    await api.delete(`/api/${type}/${id}`);
    fetchAll();
  };

  return (
    <div className="min-h-screen font-poppins bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <h3 className="text-3xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm4 3a1 1 0 000 2h6a1 1 0 100-2H7z" />
          </svg>
          Category Dashboard
        </h3>

        {/* Category Parents */}
        <Card>
          <CardContent>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Category Parents</h2>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex-1 min-w-[200px]">
                <Input
                  placeholder="Name"
                  value={parentForm.name}
                  onChange={(e) => setParentForm({ ...parentForm, name: e.target.value })}
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <Input
                  placeholder="Slug"
                  value={parentForm.slug}
                  onChange={(e) => setParentForm({ ...parentForm, slug: e.target.value })}
                />
              </div>
              <div className="flex-none">
                <Button onClick={handleCreateParent}>Add</Button>
              </div>
            </div>
            <ul className="divide-y divide-gray-200 max-h-40 overflow-y-auto thin-scrollbar">
              {parents.map((p) => (
                <li key={p._id} className="flex justify-between items-center py-2">
                  <span className="text-gray-700">
                    {p.name} <span className="text-sm text-gray-500">({p.slug})</span>
                  </span>
                  <Button
                    variant="destructive"
                    onClick={() => deleteItem(p._id, "category-parents")}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card>
          <CardContent>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Categories</h2>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex-1 min-w-[200px]">
                <Input
                  placeholder="Category Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <select
                  className="w-full border px-3 py-2 rounded bg-white text-gray-700"
                  value={form.parentId}
                  onChange={(e) => setForm({ ...form, parentId: e.target.value })}
                >
                  <option value="">Select Parent</option>
                  {parents.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-none">
                <Button onClick={handleCreateCategory}>Add</Button>
              </div>
            </div>
            <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto thin-scrollbar">
              {categories.map((c) => (
                <li key={c._id} className="flex justify-between items-center py-2">
                  <span className="text-gray-700">{c.name}</span>
                  <Button
                    variant="destructive"
                    onClick={() => deleteItem(c._id, "categories")}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CategoryDashboard;
