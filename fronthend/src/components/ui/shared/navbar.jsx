import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Avatar, AvatarImage, AvatarFallback } from "../avatar";
import { User, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mx-auto max-w-7xl h-16 px-4">
      {/* Left side - Logo */}
      <div>
        <h1 className="text-3xl font-bold">
          job<span className="text-green-500">Portal</span>
        </h1>
      </div>

      {/* Right side - Navigation */}
      <div className="flex items-center gap-6">
        <ul className="flex font-medium items-center gap-5">
          <li><Link to="/" className="hover:text-green-500 transition">Home</Link></li>
          <li><Link to="/jobs" className="hover:text-green-500 transition">Jobs</Link></li>
          <li><Link to="/browse" className="hover:text-green-500 transition">Browse</Link></li>
        </ul>

        {/* Conditional Rendering */}
        {!user ? (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="border border-green-600 text-green-600 px-4 py-1 rounded-md hover:bg-green-50 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-purple-600 text-white px-4 py-1 rounded-md hover:bg-purple-700 transition"
            >
              Signup
            </Link>
          </div>
        ) : (
          /* Popover - User Menu */
          <Popover>
            <PopoverTrigger asChild>
              <div className="cursor-pointer">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>UP</AvatarFallback>
                </Avatar>
              </div>
            </PopoverTrigger>

            <PopoverContent className="p-4 w-56 rounded-xl shadow-lg">
              {/* Avatar + Name + Email */}
              <div className="flex items-center gap-3 mb-3 border-b pb-3">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>UP</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <h4 className="font-medium leading-tight">{user?.name || 'User'}</h4>
                  <p className="text-sm text-gray-500">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
              </div>

              {/* Profile + Logout Buttons with Icons */}
              <div className="flex flex-col gap-2">
                <button className="flex items-center gap-2 text-green-600 hover:bg-green-50 px-2 py-1 rounded-md text-left transition">
                  <User className="w-4 h-4" />
                  View Profile
                </button>
                <button
                  className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-2 py-1 rounded-md text-left transition"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default Navbar;
