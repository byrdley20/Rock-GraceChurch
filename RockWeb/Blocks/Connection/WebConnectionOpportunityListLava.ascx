<%@ Control Language="C#" AutoEventWireup="true" CodeFile="WebConnectionOpportunityListLava.ascx.cs" Inherits="RockWeb.Blocks.Connection.WebConnectionOpportunityListLava" %>

<asp:UpdatePanel ID="upConnectionSelectLava" runat="server">
    <ContentTemplate>
        <div class="row">
            <div class="col-xs-12 pb-2">
                <asp:HyperLink ID="hlOptions" runat="server" CssClass="text-muted text-semibold pull-right"><i class="fa fa-sliders"></i>&nbsp;&nbsp;Options</asp:HyperLink>
            </div>
            <div class="col-xs-12">
                <asp:Literal ID="lContent" runat="server"></asp:Literal>
            </div>
        </div>
    </ContentTemplate>
</asp:UpdatePanel>
