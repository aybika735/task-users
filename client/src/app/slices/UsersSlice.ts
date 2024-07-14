import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../types/index";
import { fetchUsers, addUser, updateUser, fetchUserById } from "../api/userApi";

const initialState: InitialState = {
  isLoading: true,
  users: [],
  userById: null,
  filterRole: "all",
  filterIsArchive: false,
  sortName: false,
  sortBirthday: false,
  isError: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    filterRole(state, action) {
      state.filterRole = action.payload;
    },
    filterIsArchive(state, action) {
      state.filterIsArchive = action.payload;
    },
    toggleSortName(state) {
      state.sortName = !state.sortName;
      state.sortBirthday = false;
    },
    toggleSortBirthday(state) {
      state.sortBirthday = !state.sortBirthday;
      state.sortName = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = "";
        state.users = [];
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
        state.isError = "";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.isError = "";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.isLoading = true;
        state.isError = "";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userById = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export const {
  filterRole,
  filterIsArchive,
  toggleSortName,
  toggleSortBirthday,
} = usersSlice.actions;

export default usersSlice.reducer;













// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// export interface Users {
//   id: number;
//   name: string;
//   phone: string;
//   birthday: string;
//   role: string;
//   isArchive: boolean;
// }
// export const fetchUsers = createAsyncThunk(
//   "employees/fetchUsers",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetch("http://localhost:5000/users");
//       if (!response.ok) {
//         throw new Error("Server is not okay");
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const addUser = createAsyncThunk(
//   "users/addUser",
//   async (user: Users) => {
//     try {
//       const response = await fetch("http://localhost:5000/users", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(user),
//       });
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }
// );

// export const updateUser = createAsyncThunk(
//   "users/updateUser",
//   async (user: Users) => {
//     try {
//       const response = await fetch(`http://localhost:5000/users/${user.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(user),
//       });
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }
// );
// export const fetchUserById = createAsyncThunk(
//   "users/fetchUserById",
//   async (id: number, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`http://localhost:5000/users/${id}`, {
//         method: "GET",
//         headers: {
//           "Content-type": "application/json",
//         },
//       });
//       if (!response.ok) {
//         throw new Error("Server response not okay");
//       }
//       const data = await response.json();
//       console.log(data);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export interface InitialState {
//   users: Users[];
//   userById: Users | null;
//   isLoading: boolean;
//   filterRole: "all" | "cook" | "waiter" | "driver";
//   filterIsArchive: boolean;
//   sortName: boolean;
//   sortBirthday: boolean;
//   isError: string;
// }
// const initialState: InitialState = {
//   isLoading: true,
//   users: [],
//   userById: null,
//   filterRole: "all",
//   filterIsArchive: false,
//   sortName: false,
//   sortBirthday: false,
//   isError: "",
// };

// const usersSlice = createSlice({
//   name: "users",
//   initialState,

//   reducers: {
//     filterRole(state, action) {
//       state.filterRole = action.payload;
//     },
//     filterIsArchive(state, action) {
//       state.filterIsArchive = action.payload;
//     },
//     toggleSortName(state) {
//       state.sortName = !state.sortName;

//       state.sortBirthday = false;
//     },
//     toggleSortBirthday(state) {
//       state.sortBirthday = !state.sortBirthday;
   
//       state.sortName =false;
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.pending, (state) => {
//         state.isLoading = true;
//         state.isError = "";
//         state.users = [];
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.users = action.payload;
//       })
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = action.error.message;
//       })
//       .addCase(addUser.pending, (state) => {
//         state.isLoading = true;
//         state.isError = "";
//       })
//       .addCase(addUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.users.push(action.payload);
//       })
//       .addCase(addUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = action.error.message;
//       })
//       .addCase(updateUser.pending, (state) => {
//         state.isLoading = true;
//         state.isError = "";
//       })
//       .addCase(updateUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         const index = state.users.findIndex(
//           (user) => user.id === action.payload.id
//         );
//         if (index !== -1) {
//           state.users[index] = action.payload;
//         }
//       })
//       .addCase(updateUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = action.error.message;
//       })
//       .addCase(fetchUserById.pending, (state) => {
//         state.isLoading = true;
//         state.isError = "";
//       })
//       .addCase(fetchUserById.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.userById = action.payload;
//       })
//       .addCase(fetchUserById.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = action.error.message;
//       });
//   },
// });

// export const {
//   filterRole,
//   filterIsArchive,
//   toggleSortName,
//   toggleSortBirthday,
// } = usersSlice.actions;

// export default usersSlice.reducer;
