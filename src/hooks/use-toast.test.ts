import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useToast, toast, reducer } from "@/hooks/use-toast";

describe("useToast hook", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("reducer", () => {
    it("should handle ADD_TOAST action", () => {
      const initialState = { toasts: [] };
      const action = {
        type: "ADD_TOAST" as const,
        toast: {
          id: "1",
          open: true,
          title: "Test Toast",
        },
      };

      const newState = reducer(initialState, action);

      expect(newState.toasts.length).toBe(1);
      expect(newState.toasts[0].title).toBe("Test Toast");
    });

    it("should limit toasts to TOAST_LIMIT (1)", () => {
      const initialState = { toasts: [] };
      
      // Add first toast
      let newState = reducer(initialState, {
        type: "ADD_TOAST",
        toast: { id: "1", open: true, title: "First" },
      });

      // Add second toast
      newState = reducer(newState, {
        type: "ADD_TOAST",
        toast: { id: "2", open: true, title: "Second" },
      });

      // Should only have 1 toast (the most recent)
      expect(newState.toasts.length).toBe(1);
      expect(newState.toasts[0].title).toBe("Second");
    });

    it("should handle UPDATE_TOAST action", () => {
      const initialState = {
        toasts: [{ id: "1", open: true, title: "Original" }],
      };

      const action = {
        type: "UPDATE_TOAST" as const,
        toast: { id: "1", title: "Updated" },
      };

      const newState = reducer(initialState, action);

      expect(newState.toasts[0].title).toBe("Updated");
    });

    it("should handle DISMISS_TOAST action", () => {
      const initialState = {
        toasts: [{ id: "1", open: true, title: "Test" }],
      };

      const action = {
        type: "DISMISS_TOAST" as const,
        toastId: "1",
      };

      const newState = reducer(initialState, action);

      expect(newState.toasts[0].open).toBe(false);
    });

    it("should handle REMOVE_TOAST action", () => {
      const initialState = {
        toasts: [
          { id: "1", open: true },
          { id: "2", open: true },
        ],
      };

      const action = {
        type: "REMOVE_TOAST" as const,
        toastId: "1",
      };

      const newState = reducer(initialState, action);

      expect(newState.toasts.length).toBe(1);
      expect(newState.toasts[0].id).toBe("2");
    });

    it("should remove all toasts when toastId is undefined", () => {
      const initialState = {
        toasts: [
          { id: "1", open: true },
          { id: "2", open: true },
        ],
      };

      const action = {
        type: "REMOVE_TOAST" as const,
        toastId: undefined,
      };

      const newState = reducer(initialState, action);

      expect(newState.toasts.length).toBe(0);
    });
  });

  describe("toast function", () => {
    it("should create a toast with an id", () => {
      const result = toast({ title: "Test Toast" });

      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("dismiss");
      expect(result).toHaveProperty("update");
    });

    it("should generate unique ids", () => {
      const toast1 = toast({ title: "First" });
      const toast2 = toast({ title: "Second" });

      expect(toast1.id).not.toBe(toast2.id);
    });

    it("should return dismiss function", () => {
      const result = toast({ title: "Test" });

      expect(typeof result.dismiss).toBe("function");
    });

    it("should return update function", () => {
      const result = toast({ title: "Test" });

      expect(typeof result.update).toBe("function");
    });
  });

  describe("useToast hook", () => {
    it("should return toast state and functions", () => {
      const { result } = renderHook(() => useToast());

      expect(result.current).toHaveProperty("toasts");
      expect(result.current).toHaveProperty("toast");
      expect(result.current).toHaveProperty("dismiss");
    });

    it("should add toast when toast function is called", () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.toast({ title: "New Toast" });
      });

      expect(result.current.toasts.length).toBe(1);
    });

    it("should dismiss toast when dismiss is called", () => {
      const { result } = renderHook(() => useToast());

      let toastId: string;

      act(() => {
        const toastResult = result.current.toast({ title: "Test Toast" });
        toastId = toastResult.id;
      });

      act(() => {
        result.current.dismiss(toastId!);
      });

      expect(result.current.toasts[0].open).toBe(false);
    });
  });
});