using backend.IRepository;
using backend.Models;
using backend.Services;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<dbContext>(op => op.UseSqlServer(builder.Configuration.GetConnectionString("MyConnection")));


builder.Services.AddScoped<IBusServiceRepo, busSerivceService>();
builder.Services.AddScoped<ITransportCompanyRepo, transportCompanyService>();
builder.Services.AddScoped<IBusrepo, backend.Services.BusService>();
builder.Services.AddScoped<IFinalLocationRepo, finalLocationService>();
builder.Services.AddScoped<IFirstLocationRepo, firstLocationService>();

//fix lỗi json bị vòng lặp 
builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
