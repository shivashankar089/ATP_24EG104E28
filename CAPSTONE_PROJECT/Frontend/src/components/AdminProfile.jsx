import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/apiConfig";
import { toast } from "react-hot-toast";
import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router";
import {
  pageTitleClass,
  cardClass,
  headingClass,
  subHeadingClass,
  bodyText,
  mutedText,
  primaryBtn,
  secondaryBtn,
  loadingClass,
  errorClass,
  tagClass,
  divider,
} from "../styles/common";

function AdminProfile() {
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("users");

  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, articlesRes] = await Promise.all([
        axios.get(`${API_URL}/admin-api/users`, { withCredentials: true }),
        axios.get(`${API_URL}/admin-api/articles`, { withCredentials: true }),
      ]);
      setUsers(usersRes.data.payload);
      setArticles(articlesRes.data.payload);
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || "Failed to fetch admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const res = await axios.put(
        `${API_URL}/admin-api/users`,
        { userId, isUserActive: !currentStatus },
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        // update local state
        setUsers(users.map(u => u._id === userId ? { ...u, isUserActive: !currentStatus } : u));
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update user status");
    }
  };

  if (loading) return <p className={loadingClass}>Loading Admin Dashboard...</p>;
  if (error) return <p className={errorClass}>{error}</p>;

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-2">
        <h1 className={pageTitleClass}>Admin Dashboard</h1>
        <button
          className="bg-[#ff3b30] text-white text-sm px-5 py-2 rounded-full hover:bg-[#d62c23] transition cursor-pointer"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
      <p className={bodyText}>Manage users and monitor application activity.</p>

      <div className={divider} />

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("users")}
          className={activeTab === "users" ? primaryBtn : secondaryBtn}
        >
          Users ({users.length})
        </button>
        <button
          onClick={() => setActiveTab("articles")}
          className={activeTab === "articles" ? primaryBtn : secondaryBtn}
        >
          Articles ({articles.length})
        </button>
      </div>

      {activeTab === "users" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {users.map((user) => (
            <div key={user._id} className={cardClass}>
              <div className="flex justify-between items-start">
                <div className="flex gap-4 items-center">
                   {user.profileImageUrl ? (
                    <img src={user.profileImageUrl} alt="" className="w-12 h-12 rounded-full object-cover" />
                   ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      {user.firstName[0]}
                    </div>
                   )}
                   <div>
                     <h3 className={subHeadingClass}>{user.firstName} {user.lastName}</h3>
                     <p className={mutedText}>{user.email}</p>
                     <span className={tagClass}>{user.role}</span>
                   </div>
                </div>
                <button
                  onClick={() => toggleUserStatus(user._id, user.isUserActive)}
                  className={`text-xs px-3 py-1.5 rounded-full font-semibold ${
                    user.isUserActive 
                      ? "bg-red-50 text-red-600 hover:bg-red-100" 
                      : "bg-green-50 text-green-600 hover:bg-green-100"
                  } transition-colors`}
                >
                  {user.isUserActive ? "Disable User" : "Enable User"}
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${user.isUserActive ? "bg-green-500" : "bg-red-500"}`} />
                <span className="text-xs font-medium uppercase tracking-wider text-[#6e6e73]">
                  Status: {user.isUserActive ? "Active" : "Disabled"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "articles" && (
        <div className="grid grid-cols-1 gap-4">
          {articles.map((article) => (
            <div key={article._id} className={cardClass}>
              <div className="flex justify-between items-center">
                <div>
                  <span className={tagClass}>{article.category}</span>
                  <h3 className={headingClass}>{article.title}</h3>
                  <p className={mutedText}>Published on {new Date(article.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-[#6e6e73]">Comments</p>
                  <p className="text-xl font-bold text-[#1d1d1f]">{article.comments?.length || 0}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminProfile;