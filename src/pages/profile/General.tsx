import { useForm, type SubmitHandler } from "react-hook-form";
import { Form, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { GENERAL_INPUTS } from "@/data";
import { FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProfileStore } from "@/store/useProfile";
import { useAuthStore } from "@/store/Auth/useAuthStore";
import { useRef, useCallback, useEffect } from "react";
import { Loader, X } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PageLoader from "@/components/ui/PageLoader";
import { toast } from "sonner";
interface IGeneral {
  full_name: string;
  username: string;
  email: string;
  bio: string;
  avatar: string | File;
}
const General = () => {
  const form = useForm<IGeneral>();
  const inputRef = useRef<HTMLInputElement>(null);
  const { updateProfile, isLoading, getUserProfile } = useProfileStore();
  const { userProfile } = useAuthStore();
  const queryClient = useQueryClient();
  //TODO: اضافاة disabled في حال لم تتم تغير الداتا
  // get user profile
  const { data: profileData, isLoading: profileLoading, } = useQuery({
    queryKey: ["profile", userProfile?.id],
    queryFn: async () => {
      const data = await getUserProfile(userProfile?.id || "");
      return data;
    },
  });
  const onSubmit: SubmitHandler<IGeneral> = async (data) => {
    try {
      await updateProfile(data);
      queryClient.invalidateQueries({ queryKey: ["profile", userProfile?.id] });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        style: {
          background: "var(--danger-300)",
          border: "1px solid var(--danger-500)",
          color: "#fff",
        },
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    if (profileData) {
      form.setValue("full_name", profileData.full_name || "");
      form.setValue("username", profileData.username || "");
      form.setValue("email", profileData.email || "");
      form.setValue("bio", profileData.bio || "");
      form.setValue("avatar", profileData.avatar_url || "");
    }
    
  }, [profileData, form]);

  const resetDefaultImage = useCallback(() => {
    form.setValue("avatar", "");
  }, [form]);

  //! render Inputs
  const renderInputs = GENERAL_INPUTS.map((input) => (
    <FormItem key={input.id}>
      <FormControl>
        <Input
          placeholder={input.placeholder}
          type={input.type}
          className="h-11"
          {...form.register(input.name, input.validation)}
        />
      </FormControl>
      <FormMessage>{form.formState.errors[input.name]?.message}</FormMessage>
    </FormItem>
  ));

  if (profileLoading) return <PageLoader />;
  return (
    <section className="w-full space-y-4 mb-2">
      <Form {...form}>
        <form
          className="w-full space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* avatar */}
          <FormItem>
            <FormControl>
              <Input
                placeholder="Avatar"
                type="file"
                multiple={false}
                className="h-11"
                accept="image/*"
                {...form.register("avatar")}
                hidden
                ref={inputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  form.setValue("avatar", file || "");
                }}
              />
            </FormControl>
            <FormMessage>{form.formState.errors.avatar?.message}</FormMessage>
          </FormItem>
          {/* fake upload input cricel */}
          <div className="flex flex-row items-center gap-2 relative">
            {form.watch("avatar") instanceof File && (
              <Button
                variant={"ghost"}
                size={"icon"}
                type="button"
                onClick={resetDefaultImage}
                className="size-5 bg-gray-900 text-white absolute top-0 left-0"
              >
                <X className="size-4" />
              </Button>
            )}
            <img
              src={
                form.watch("avatar") && form.watch("avatar") instanceof File
                  ? URL.createObjectURL(form.watch("avatar") as File)
                  : `${profileData?.avatar_url === null ? "https://avatar.iran.liara.run/public/41" : profileData?.avatar_url}`
              }
              alt="profile avatar"
              aria-label="avatar"
              className="size-16 sm:size-20 rounded-full border-[var(--primary-600)] border-2 border-dashed"
            />
            {/* upload button */}
            <div>
              <Button
                variant={"ghost"}
                type="button"
                aria-label="Upload profile picture"
                title="Upload profile picture"
                onClick={() => inputRef.current?.click()}
              >
                Upload
              </Button>
            </div>
          </div>

          {renderInputs}
          {/* bio */}
          <FormItem>
            <FormControl>
              <Textarea
                placeholder="Bio"
                className="h-20"
                {...form.register("bio")}
              />
            </FormControl>
            <FormMessage>{form.formState.errors.bio?.message}</FormMessage>
          </FormItem>

          <Button
            className="w-fit h-11"
            type="submit"
            variant={"neutral"}
            aria-label="Login"
            disabled={
             isLoading ||
             form.formState.isSubmitting ||
              !form.formState.isDirty
             }
             title={!form.formState.isDirty ? "No changes to save" : undefined}
          >
            {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            {form.formState.isDirty ? "Save Changes" : "No changes to save"}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default General;
