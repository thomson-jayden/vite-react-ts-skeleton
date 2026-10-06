var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.App_Api>("api");

builder.AddNpmApp("frontend", "../../apps/frontend", "dev",
		args: ["--host", "127.0.0.1", "--port", "5173", "--strictPort"])
	.WithHttpEndpoint(targetPort: 5173);

builder.Build().Run();
