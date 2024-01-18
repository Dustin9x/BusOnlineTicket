﻿using backend.Models;

namespace backend.IRepository
{
    public interface ITicketRepo
    {
        Task<IEnumerable<Ticket>> GetTicketByUser(int Id);
        Task<bool> AddTicket(Ticket ticket);
        Task<Ticket> CancelTicket(int Id, int Day);
    }
}